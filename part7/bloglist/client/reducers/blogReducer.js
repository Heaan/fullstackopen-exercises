import blogService from 'Utilities/services/blogs';
import { success, fail, reset } from 'Reducers/messageReducer';
import { toggleTo } from './toggleReducer';

export const initializeBlogs = () => async (dispatch) => {
  const data = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data,
  });
};

export const createFrom = (blog) => async (dispatch) => {
  try {
    const data = await blogService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data,
    });
    dispatch(toggleTo(false));
    dispatch(success(`success: a new blog ${blog.title} added`));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  } catch (exception) {
    dispatch(fail('error: failed creating'));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }
};

export const like = (blog) => async (dispatch) => {
  const data = await blogService.update(blog);
  dispatch({
    type: 'LIKE_BLOG',
    data,
  });
};

export const remove = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch({
    type: 'REMOVE_BLOG',
    data: {
      id,
    },
  });
};

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'INIT_BLOGS':
    return data.map((item) => item);
  case 'NEW_BLOG':
    return [...state, data];
  case 'LIKE_BLOG': {
    const { id } = data;
    return state.map((item) => (item.id === id ? data : item));
  }
  case 'REMOVE_BLOG': {
    const { id } = data;
    return state.filter((item) => item.id !== id);
  }
  default:
    return state;
  }
};

export default reducer;
