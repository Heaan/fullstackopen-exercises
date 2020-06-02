import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'Components/Button';
import { like, remove, toggleWith } from 'Reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const {
    title, author, url, likes, id, user, visible,
  } = blog;

  const text = visible ? 'hide' : 'view';

  const toggle = () => {
    dispatch(toggleWith({ ...blog, visible: !visible }));
  };

  const handleLike = () => {
    dispatch(like({ ...blog, likes: likes + 1 }));
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${title}`)) {
      dispatch(remove(id));
    }
  };

  return (
    <div className="blog-item">
      <div>
        {title}
        {' '}
        {author}
        <Button type="button" text={text} handleClick={toggle} />
      </div>
      {visible && (
        <div className="blog-details">
          <div>{url}</div>
          <div>
            likes
            {' '}
            <span className="likes-num">{likes}</span>
            <Button type="button" text="like" handleClick={handleLike} />
          </div>
          <div>{user.name}</div>
          <Button styleClass="remove" type="button" text="remove" handleClick={handleRemove} />
        </div>
      )}
    </div>
  );
};

export default Blog;
