import React from 'react';
import propTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

const BlogForm = ({
  user,
  title,
  author,
  url,
  handleCreate,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  if (user !== null) {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <Input
            text="title"
            type="text"
            name="title"
            value={title}
            handleChange={handleTitleChange}
          />
          <Input
            text="author"
            type="text"
            name="author"
            value={author}
            handleChange={handleAuthorChange}
          />
          <Input text="url" type="text" name="url" value={url} handleChange={handleUrlChange} />
          <Button type="submit" text="create" />
        </form>
      </div>
    );
  }
  return null;
};
BlogForm.propTypes = {
  user: propTypes.object,
  title: propTypes.string.isRequired,
  author: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  handleCreate: propTypes.func,
  handleTitleChange: propTypes.func,
  handleAuthorChange: propTypes.func,
  handleUrlChange: propTypes.func,
};

export default BlogForm;
