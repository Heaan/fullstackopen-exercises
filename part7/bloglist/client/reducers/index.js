import { combineReducers } from 'redux';
import blogReducer from 'Reducers/blogReducer';
import messageReducer from 'Reducers/messageReducer';
import logReducer from 'Reducers/logReducer';
import toggleReducer from 'Reducers/toggleReducer';

export default combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: logReducer,
  visible: toggleReducer,
});
