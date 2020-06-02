export const toggleTo = (data) => ({
  type: 'TOGGLE',
  data,
});

const reducer = (state = false, { type, data }) => {
  switch (type) {
    case 'TOGGLE':
      return data;

    default:
      return state;
  }
};

export default reducer;
