import React from 'react';
import { useDispatch } from 'react-redux';
import { createFrom } from 'Reducers/blogReducer';
import { TextField, Button, Paper, Container } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

const BlogForm = ({ toggle }) => {
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
    toggle(false);
  };

  return (
    <Paper style={{ maxWidth: 600 }}>
      <h2 style={{ padding: 20 }}>Create New</h2>
      <Container component="form" onSubmit={addNew} style={{ maxWidth: 500 }}>
        <div>
          <TextField fullWidth margin="normal" id="title" label="Title" name="title" />
        </div>
        <div>
          <TextField fullWidth margin="normal" id="author" label="Author" name="author" />
        </div>
        <div>
          <TextField fullWidth margin="normal" id="url" label="Url" name="url" />
        </div>
        <Button
          style={{ margin: '10px 10px 10px 350px' }}
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Container>
    </Paper>
  );
};

export default BlogForm;
