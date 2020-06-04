export const reset = () => ({
  type: 'RESET',
});

export const fail = (message) => ({
  type: 'ERROR',
  data: message,
});

export const success = (message) => ({
  type: 'SUCCESS',
  data: message,
});

const reducer = (state = null, { type, data }) => {
  switch (type) {
  case 'RESET':
    return null;
  case 'ERROR':
    return data;
  case 'SUCCESS':
    return data;
  default:
    return state;
  }
};

export default reducer;
