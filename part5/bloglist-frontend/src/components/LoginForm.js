import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

const LoginForm = ({
  user,
  username,
  password,
  handleLogin,
  handleUserChange,
  handlePassChange,
  handleLogout,
}) => {
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
            handleChange={handleUserChange}
          />
          <Input
            text="password"
            type="password"
            name="password"
            value={password}
            handleChange={handlePassChange}
          />
          <Button type="submit" text="login" />
        </form>
      </div>
    );
  }
  return (
    <div>
      <p>
        {user.name} logged in <Button type="button" text="logout" handleClick={handleLogout} />
      </p>
    </div>
  );
};
LoginForm.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func,
  handleUserChange: PropTypes.func,
  handlePassChange: PropTypes.func,
  handleLogout: PropTypes.func,
};

export default LoginForm;
