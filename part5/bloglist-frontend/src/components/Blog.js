import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Blog = ({ blog, good }) => {
  const [visible, setVisible] = useState(false);

  const {
    title, author, url, likes,
  } = blog;

  const show = { display: visible ? '' : 'none' };
  const text = visible ? 'hide' : 'view';

  const toggle = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    good({ ...blog, likes: likes + 1 });
  };

  return (
    <div className="blog-item">
      <header>
        <span>{title}</span>
        <Button type="button" text={text} handleClick={toggle} />
      </header>
      <div style={show}>
        <section>{url}</section>
        <section>
          <span>likes {likes}</span>
          <Button type="button" text="like" handleClick={handleLike} />
        </section>
        <section>{author}</section>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  good: PropTypes.func.isRequired,
};

export default Blog;
