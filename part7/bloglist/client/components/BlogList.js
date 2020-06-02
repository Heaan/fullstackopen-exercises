import React from 'react';
import { useSelector } from 'react-redux';
import Blog from 'Components/Blog';

const BlogList = ({ handleRemove }) => {
  const blogs = useSelector((state) => [...state.blogs].sort((first, second) => second.likes - first.likes));

  return (
    <div>
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} remove={handleRemove} />
      ))}
    </div>
  );
};

export default BlogList;
