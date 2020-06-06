import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemAvatar, ListItemText, Paper, Box } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/Note';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <Paper style={{ padding: 10 }}>
      <Box component="h2" style={{ padding: 5, display: 'inline-block', borderBottom: 'solid' }}>
        {user.name}
      </Box>
      <Box component="h3" style={{ margin: 5 }}>
        <LocalLibraryIcon fontSize="small" />
        <span style={{ padding: 5 }}>added blogs</span>
      </Box>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemAvatar>
              <NoteIcon />
            </ListItemAvatar>
            <ListItemText primary={blog.title} secondary={blog.author} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default User;
