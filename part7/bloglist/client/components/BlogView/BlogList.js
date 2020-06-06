import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

const BlogList = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((first, second) => second.likes - first.likes),
  );

  return (
    <div>
      {blogs.map((blog) => (
        <Paper
          style={{ padding: 10 }}
          variant="outlined"
          square
          key={blog.id}
          className="blog-item"
        >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </Paper>
      ))}
    </div>
  );
};

export default BlogList;
