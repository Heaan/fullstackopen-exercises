import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

const LoginForm = ({ user, login, logout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <Input
            text="username"
            type="text"
            name="username"
            value={username}
            handleChange={({ target }) => setUsername(target.value)}
          />
          <Input
            text="password"
            type="password"
            name="password"
            value={password}
            handleChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" text="login" />
        </form>
      </div>
    );
  }
  return (
    <div>
      <p>
        {user.name} logged in <Button type="button" text="logout" handleClick={logout} />
      </p>
    </div>
  );
};
LoginForm.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LoginForm;
