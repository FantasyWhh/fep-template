import 'react-app-polyfill/stable';
import React from 'react';
import { render, Router } from 'mirrorx';
import '../assets/index.scss';
import App from '../models/appModel';
import * as serviceWorker from '../serviceWorker';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
