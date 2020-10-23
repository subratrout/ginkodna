
import React from 'react';
import './index.css';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Sequences from './Sequences';
import SequenceList from './views/SequenceList';


// Set up pages using the React Router Link element for navigation - instead of <a></a>
const App = () => (
  <div>
    <h1>GINKO DNA Sequence Submitter</h1>
    <ul >
      <li><Link to="/submit-sequence">Submit Sequence</Link></li>
      <li><Link to="/list-sequences">List Sequences</Link></li>
    </ul>

    <Switch>
      <Route exact path="/submit-sequence" component={Sequences} />
      <Route path='/list-sequences' component={SequenceList} />
    </Switch>
  </div>
)

export default App