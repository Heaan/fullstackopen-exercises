import React from 'react';
import { useDispatch } from 'react-redux';
import Input from 'Components/Input';
import Button from 'Components/Button';
import { createFrom } from 'Reducers/blogReducer';

const BlogForm = (props) => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    event.target.title.value = '';
    const author = event.target.author.value;
    event.target.author.value = '';
    const url = event.target.url.value;
    event.target.url.value = '';
    dispatch(createFrom({ title, author, url }));
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNew}>
        <Input id="title" text="title" type="text" name="title" />
        <Input id="author" text="author" type="text" name="author" />
        <Input id="url" text="url" type="text" name="url" />
        <Button id="create" type="submit" text="create" />
      </form>
    </div>
  );
};

export default BlogForm;
