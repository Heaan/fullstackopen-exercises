import React from 'react';
import { useSelector } from 'react-redux';

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <ul>
      {comments.map((items) => (
        <li key={items.id}>{items.content}</li>
      ))}
    </ul>
  );
};

export default Comments;
