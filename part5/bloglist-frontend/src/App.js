import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await blogService.getAll();
      setBlogs(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserInfo(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = React.createRef();

  const handleLogin = async (userLogin) => {
    try {
      const user = await loginService.login(userLogin);

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUserInfo(user);
      setErrorMessage(`success: welcome ${user.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('error: wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUserInfo(null);
    blogService.setToken(null);
    setErrorMessage('success: see you next time!');
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleCreate = async (blog) => {
    try {
      const data = await blogService.create(blog);

      blogFormRef.current.toggle();

      const blogList = blogs.concat(data);
      setBlogs(blogList);
      setErrorMessage(`success: a new blog ${data.title} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('error: failed creating');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <LoginForm user={userInfo} login={handleLogin} logout={handleLogout} />
      {userInfo !== null && (
        <Togglable text="new blog" ref={blogFormRef}>
          <BlogForm create={handleCreate} />
        </Togglable>
      )}
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
