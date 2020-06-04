import commentService from 'Utilities/services/comments';

export const fetchComments = (blogId) => {
  return async (dispatch) => {
    const data = await commentService.getAllIn(blogId);
    dispatch({
      type: 'FETCH_COMMENTS',
      data,
    });
  };
};

export const createComment = (blog) => {
  return async (dispatch) => {
    const data = await commentService.create(blog);
    dispatch({
      type: 'CREATE_COMMENT',
      data,
    });
  };
};

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'FETCH_COMMENTS':
    return data;
  case 'CREATE_COMMENT':
    return [...state, data];
  default:
    return state;
  }
};

export default reducer;
