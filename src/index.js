import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <Main /> */}
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
