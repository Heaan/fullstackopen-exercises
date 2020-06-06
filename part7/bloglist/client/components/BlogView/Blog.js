import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tooltip, IconButton } from '@material-ui/core';
import { like } from 'Reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { fetchComments } from 'Reducers/commentReducer';
import Comments from 'Components/Comments';
import CommentForm from 'Components/commentForm';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id]);

  const handleLike = () => {
    dispatch(like({ ...blog, likes: blog.likes + 1 }));
  };

  if (!blog) {
    return null;
  }
  return (
    <Paper style={{ padding: 10 }}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Tooltip title="Like" aria-label="like">
          <IconButton type="button" onClick={handleLike}>
            <ThumbUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        <h3>comments</h3>
        <CommentForm blog={id} />
        <Comments />
      </div>
    </Paper>
  );
};

export default Blog;
