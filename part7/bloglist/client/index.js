import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'Components/App';
import ErrorBoundary from 'Components/ErrorBoundary';
import Store from './Store';

ReactDOM.render(
  <Provider store={Store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
