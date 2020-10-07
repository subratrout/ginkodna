import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>GINKO-DNA</h1>
      </header>
      <h2>Submit Your DNA Sequence header</h2>
      <form>
        <label>Name:<input type="text" name="name" /></label>
        <label>Description:<input type="text" name="description" /></label>
        <label>Sequence:<input type="textarea" name="sequence" /></label>
        <br/>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
