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
import { initializeUsers } from 'Reducers/usersReducer';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import User from 'Components/User';

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <Router>
      <h2>Blogs</h2>
      <Notification />
      <LoginForm />
      <Switch>
        <Route path="/users">
          <UsersList />
        </Route>

        <Route path="/blogs/:id">
          <User />
        </Route>
        <Route path="/blogs">
          {userInfo !== null && (
            <Togglable text="create new blog">
              <BlogForm />
            </Togglable>
          )}
          <BlogList />
        </Route>
        <Route path="/">
          <div>Welcome!</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
