import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App'
import Sequences from './Sequences';
import SequenceList from './views/SequenceList';

const routing = (
  <Router>
    <div>
      <Route path = "/" component = {Sequences} />
      <Route path = "/sequence-list" component = {SequenceList} />
    </div>
  </Router>
)
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
