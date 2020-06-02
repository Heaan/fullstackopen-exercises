import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Reducers from './reducers/index';

export default createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));
