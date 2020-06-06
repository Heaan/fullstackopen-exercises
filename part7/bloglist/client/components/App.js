import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Blog, BlogList, BlogForm } from 'Components/BlogView/index';
import { User, UsersList } from 'Components/UserView/index';
import Notification from 'Components/Notification';
import LoginForm from 'Components/LoginForm';
import blogService from 'Utilities/services/blogs';
import Togglable from 'Components/Togglable';
import { initializeUsers } from 'Reducers/usersReducer';
import { initializeBlogs } from 'Reducers/blogReducer';
import { logged, logout } from 'Reducers/logReducer';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import { success, reset } from 'Reducers/messageReducer';
import { Container, AppBar, Toolbar, IconButton, Tooltip, Button, Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: 'white',
  },
});

const App = () => {
  const dispatch = useDispatch();
  const logoutColor = useStyles();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logged(user));
      blogService.setToken(user.token);
    }
  }, []);

  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(logout());
    blogService.setToken(null);
    dispatch(success('success: see you next time!'));
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  };

  const padding = {
    padding: 5,
  };

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            {userInfo ? (
              <span style={padding}>
                <em>{userInfo.name} logged in</em>
                <Tooltip title="logout">
                  <IconButton component="span" onClick={handleLogout}>
                    <ExitToAppIcon classes={{ root: logoutColor.root }} />
                  </IconButton>
                </Tooltip>
              </span>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Notification />
        <Box component="h1" style={{ padding: 5 }}>
          <BubbleChartIcon />
          Blog app
        </Box>

        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
          <Route path="/login">{userInfo ? <Redirect to="/" /> : <LoginForm />}</Route>
          <Route path="/">
            {userInfo !== null && (
              <Togglable text="create new blog">
                <BlogForm />
              </Togglable>
            )}
            <BlogList />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
