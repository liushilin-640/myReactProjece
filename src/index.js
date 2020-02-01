import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import{BrowserRouter,HashRouter}from'react-router-dom'
import App from './App';
import './index.less';
import store from './redux/store';
ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


