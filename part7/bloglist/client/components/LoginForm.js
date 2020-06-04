import React from 'react';
import { useDispatch } from 'react-redux';
import Input from 'Components/Input';
import Button from 'Components/Button';
import { login } from 'Reducers/logReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    event.target.username.value = '';
    const password = event.target.password.value;
    event.target.password.value = '';
    dispatch(login({ username, password }));
  };

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
};

export default LoginForm;
