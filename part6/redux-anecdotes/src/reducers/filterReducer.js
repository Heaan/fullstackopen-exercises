export const filterFrom = (filter) => ({
  type: 'FILTER',
  data: {
    filter,
  },
});

const reducer = (state = '', { type, data }) => {
  switch (type) {
    case 'FILTER':
      return data.filter;
    default:
      return state;
  }
};

export default reducer;
