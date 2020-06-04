import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Button';
import { like } from 'Reducers/blogReducer';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const handleLike = () => {
    dispatch(like({ ...blog, likes: blog.likes + 1 }));
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Button type="button" text="like" handleClick={handleLike} />
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        <h3>comments</h3>
        <ul>
          {[].map((items) => (
            <li key={items.id}>{items.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
