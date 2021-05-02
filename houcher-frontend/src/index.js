import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';

import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
