import userService from 'Utilities/services/users';

export const initializeUsers = () => async (dispatch) => {
  const data = await userService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data,
  });
};

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'INIT_USERS':
    return data;

  default:
    return state;
  }
};

export default reducer;
