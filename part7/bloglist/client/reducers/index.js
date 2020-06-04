import { combineReducers } from 'redux';
import blogReducer from 'Reducers/blogReducer';
import messageReducer from 'Reducers/messageReducer';
import logReducer from 'Reducers/logReducer';
import toggleReducer from 'Reducers/toggleReducer';
import usersReducer from 'Reducers/usersReducer';
import commentReducer from 'Reducers/commentReducer';

export default combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: logReducer,
  users: usersReducer,
  visible: toggleReducer,
  comments: commentReducer,
});
