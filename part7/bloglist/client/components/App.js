import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from 'Components/Notification';
import LoginForm from 'Components/LoginForm';
import BlogForm from 'Components/BlogForm';
import blogService from 'Utilities/services/blogs';
import Togglable from 'Components/Togglable';
import './App.css';
import BlogList from 'Components/BlogList';
import { initializeBlogs } from 'Reducers/blogReducer';
import { logged } from 'Reducers/logReducer';
import UsersList from 'Components/UsersList';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import User from 'Components/User';
import Blog from './Blog';
import { logout } from 'Reducers/logReducer';
import { success, reset } from 'Reducers/messageReducer';
import Button from 'Components/Button';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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
    <Router>
      <nav className="nav">
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {userInfo ? (
          <span style={padding}>
            {userInfo.name} logged in
            <Button type="button" text="logout" handleClick={handleLogout} />
          </span>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </nav>
      <Notification />
      <h2>Blog app</h2>

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
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
  );
};

export default App;
