import 'react-app-polyfill/stable';
import React from 'react';
import { render, Router } from 'mirrorx';
import '../assets/index.scss';
import * as serviceWorker from '../serviceWorker';

function Mall() {
  return <h1>mall!!!</h1>;
}

render(
  <Router>
    <Mall />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
