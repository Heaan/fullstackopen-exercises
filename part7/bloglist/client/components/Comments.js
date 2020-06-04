import React from 'react';
import { useSelector } from 'react-redux';

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.map((items) => (
          <li key={items.id}>{items.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
