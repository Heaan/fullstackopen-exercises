import loginService from 'Utilities/services/login';
import blogService from 'Utilities/services/blogs';
import { success, reset, fail } from 'Reducers/messageReducer';

export const login = (user) => async (dispatch) => {
  try {
    const data = await loginService.login(user);
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(data));
    blogService.setToken(data.token);
    dispatch({
      type: 'LOGIN',
      data,
    });
    dispatch(success(`success: welcome ${user.name}`));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  } catch (exception) {
    dispatch(fail('error: wrong username or password'));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const logged = (user) => ({
  type: 'LOGGED',
  data: user,
});

const reducer = (state = null, { type, data }) => {
  switch (type) {
  case 'LOGIN':
    return data;
  case 'LOGOUT':
    return null;
  case 'LOGGED':
    return data;
  default:
    return state;
  }
};

export default reducer;
