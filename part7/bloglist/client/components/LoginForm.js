import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { login } from 'Reducers/logReducer';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    event.target.username.value = '';
    const password = event.target.password.value;
    event.target.password.value = '';
    dispatch(login({ username, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>
        <PermIdentityIcon style={{ position: 'relative', top: 8 }} fontSize="large" />
        <span>Log in to application</span>
      </h2>
      <form onSubmit={handleLogin}>
        <FormControl fullWidth variant="outlined" style={{ margin: 5 }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput id="username" name="username" labelWidth={70} />
        </FormControl>

        <FormControl fullWidth variant="outlined" style={{ margin: 5 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={visible ? 'text' : 'password'}
            name="password"
            labelWidth={70}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setVisible(!visible)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{ float: 'right' }}>
          <Button id="login" type="submit" variant="contained" color="primary">
            login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
