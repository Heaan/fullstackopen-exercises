import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    create({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <Input
          text="title"
          type="text"
          name="title"
          value={title}
          handleChange={({ target }) => setTitle(target.value)}
        />
        <Input
          text="author"
          type="text"
          name="author"
          value={author}
          handleChange={({ target }) => setAuthor(target.value)}
        />
        <Input
          text="url"
          type="text"
          name="url"
          value={url}
          handleChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" text="create" />
      </form>
    </div>
  );
};
BlogForm.propTypes = {
  create: PropTypes.func.isRequired,
};

export default BlogForm;
