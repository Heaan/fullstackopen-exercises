import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Blog = ({ blog, good, remove }) => {
  const [visible, setVisible] = useState(false);

  const {
    title, author, url, likes, id, user,
  } = blog;

  const text = visible ? 'hide' : 'view';

  const toggle = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    good({ ...blog, likes: likes + 1 });
  };

  const handleRemove = () => {
    remove({ title, id });
  };

  return (
    <div className="blog-item">
      <div>
        {title} {author}
        <Button type="button" text={text} handleClick={toggle} />
      </div>
      {visible && (
        <div className="blog-details">
          <div>{url}</div>
          <div>
            likes <span className="likes-num">{likes}</span>
            <Button type="button" text="like" handleClick={handleLike} />
          </div>
          <div>{user.name}</div>
          <Button styleClass="remove" type="button" text="remove" handleClick={handleRemove} />
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  good: PropTypes.func,
  remove: PropTypes.func,
};

export default Blog;
