const timeoutObj = {
  setup: function (dispatch, action, timeout) {
    this.cancel();
    this.timeoutID = setTimeout(() => {
      dispatch(action);
    }, timeout * 1000);
  },
  cancel: function () {
    if (typeof this.timeoutID === 'number') {
      clearTimeout(this.timeoutID);
      delete this.timeoutID;
    }
  },
};

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: message,
    });
    timeoutObj.setup(dispatch, { type: 'RESET', data: null }, timeout);
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
