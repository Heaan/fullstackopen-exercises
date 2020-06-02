import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import messageReducer from './messageReducer';
import logReducer from './logReducer';
import toggleReducer from './toggleReducer';

export default combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  user: logReducer,
  visible: toggleReducer,
});
