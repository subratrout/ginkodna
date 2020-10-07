import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>GINKO-DNA</h1>
      </header>
      <div className="container">
        <h2>Submit Your DNA Sequence header</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Organism/Vector Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter organism/vector name" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter organism/vector description" />
          </Form.Group>
          <Form.Group controlId="formSequence">
            <Form.Label>DNA Sequence</Form.Label>
            <Form.Control as="textarea" rows = "3" placeholder="Enter organism/vector sequence" />
          </Form.Group>
          <Button className="btn-large" type="submit">Submit</Button>
        </Form>
      </div>     
    </div>
  );
}

export default App;
