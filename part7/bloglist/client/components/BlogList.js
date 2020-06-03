import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((first, second) => second.likes - first.likes),
  );

  return (
    <div>
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
