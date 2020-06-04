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

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'FETCH_COMMENTS':
    return data;

  default:
    return state;
  }
};

export default reducer;
