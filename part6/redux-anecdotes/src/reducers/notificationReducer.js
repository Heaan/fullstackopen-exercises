const reducer = (state = NaN, { type, data }) => {
  switch (type) {
    case 'VOTE':
      return data.id;
    case 'NEW_ANECDOTE':
      return data.id;
    default:
      return state;
  }
};

export default reducer;
