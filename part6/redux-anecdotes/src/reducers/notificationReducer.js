export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: message,
    });
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      });
    }, timeout * 1000);
  };
};

const reducer = (state = null, { type, data }) => {
  switch (type) {
    case 'SET':
      return data;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export default reducer;
