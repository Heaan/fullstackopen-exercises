import React from 'react';
import { useSelector } from 'react-redux';
import { CardContent, Card } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <div>
      {comments.map((items) => (
        <Card style={{ maxWidth: 600, margin: 10 }} variant="outlined" key={items.id}>
          <FaceIcon style={{ margin: 5 }} />
          <CardContent>{items.content}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
