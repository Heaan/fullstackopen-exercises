import { combineReducers } from 'redux';
import blogReducer from 'Reducers/blogReducer';
import messageReducer from 'Reducers/messageReducer';
import logReducer from 'Reducers/logReducer';
import usersReducer from 'Reducers/usersReducer';
import commentReducer from 'Reducers/commentReducer';

export default combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: logReducer,
  users: usersReducer,
  comments: commentReducer,
});
