import React from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from 'Reducers/commentReducer';
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createComment({ content, blog }));
  };

  return (
    <form style={{ maxWidth: 600, margin: 10 }} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        type="text"
        name="content"
        id="content"
        label="Comment"
        multiline
        rows={4}
        variant="outlined"
      />
      <div>
        <Button
          style={{ margin: 10, marginLeft: 500 }}
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
