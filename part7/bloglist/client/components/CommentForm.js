import React from 'react';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { createComment } from 'Reducers/commentReducer';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createComment({ content, blog }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="content" />
      <Button type="submit" text="add comment" />
    </form>
  );
};

export default CommentForm;
