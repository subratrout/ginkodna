
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Sequences from './Sequences';
import SequenceList from './views/SequenceList';


// Set up pages using the React Router Link element for navigation - instead of <a></a>
const App = () => (
  <div>
    <h1>GINKO DNA Sequence Submitter</h1>
    <ul role="nav">
      <li><Link to="/submit-sequence">Submit Sequence</Link></li>
      <li><Link to="/list-sequences">List Sequences</Link></li>
    </ul>

    <div>
      <Route path='/submit-sequence' component={Sequences} />
      <Route path='/list-sequences' component={SequenceList} />
    </div>
  </div>
)

export default App