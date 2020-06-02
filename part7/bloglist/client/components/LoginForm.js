import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'Components/Input';
import Button from 'Components/Button';
import { login, logout } from 'Reducers/logReducer';
import blogService from 'Utilities/services/blogs';
import { success, reset } from 'Reducers/messageReducer';

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    event.target.username.value = '';
    const password = event.target.password.value;
    event.target.password.value = '';
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(logout());
    blogService.setToken(null);
    dispatch(success('success: see you next time!'));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <Input id="username" text="username" type="text" name="username" />
          <Input id="password" text="password" type="password" name="password" />
          <Button id="login" type="submit" text="login" />
        </form>
      </div>
    );
  }
  return (
    <div>
      <p>
        {user.name}
        {' '}
        logged in
        <Button type="button" text="logout" handleClick={handleLogout} />
      </p>
    </div>
  );
};

export default LoginForm;
