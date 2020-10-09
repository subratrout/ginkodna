import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Sequences extends React.Component {

  constructor(props){
    super(props);
    this.state = {sequences:{name: '', description: '', sequence: ''}, errors: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
  }
  handleChange(sequence, e) {
    let sequences = this.state.sequences;
    sequences[sequence] = e.target.value;
    this.setState({ sequences });
  }

  handleSubmit(e){
    const seqPattern = new RegExp('^[ATCG]*$', 'i');
    let errors = [];

    if (this.state.sequences.name.length < 3){
      errors.push('Name must be atleast 3 characters long');
    }

    if (this.state.sequences.description.length < 3) {
      errors.push('Description must be atleast 3 characters long');
    }
    const validSequence = seqPattern.test(String(this.state.sequences.sequence).toUpperCase());
    console.log(validSequence);
    if(!validSequence){
      errors.push('The sequence is not valid');
    }

    this.setState({
      errors: errors
    });

    if (errors.length > 0) {
      return false;
    } else {
      alert("All form fields are valid. You can now submit the sequence!");
    }
    const sequenceData = JSON.parse(localStorage.getItem('sequences')) || [];
    alert('Your Sequence: ' + this.state.sequences.name + ' submitted.');
    console.log(`Name: ${this.state.sequences.name} description: ${this.state.sequences.description} sequence: ${this.state.sequences.sequence}`);

    const single_seq = { sequenceName: this.state.sequences.name,
                         sequenceDescription: this.state.sequences.description,
                         sequence: this.state.sequences.sequence}
    sequenceData.push(single_seq);
    localStorage.setItem('sequences', JSON.stringify(sequenceData))

    this.setState({sequences:{name: '', description: '', sequence: ''}});
    e.preventDefault(); 
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>GINKO-DNA</h1>
        </header>
        <div className="container">
          <h2>Submit Your DNA Sequence header</h2>
          <div className="col-md-6">
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Organism/Vector Name:</Form.Label>
                <Form.Control type="text" value={this.state.sequences["name"] || ''} onChange={this.handleChange.bind(this, "name")} placeholder="Enter organism/vector name" />
                <Form.Text className="text-muted"></Form.Text>
                <Form.Control.Feedback type="invalid">
                  className={
                    this.hasError("firstname")
                      ? "form-control is-invalid"
                      : "form-control"}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={this.state.sequences["description"] || ''} onChange={this.handleChange.bind(this, "description")} placeholder="Enter organism/vector description" />
              </Form.Group>
              <Form.Group controlId="formSequence">
                <Form.Label>DNA Sequence</Form.Label>
                <Form.Control as="textarea" value={this.state.sequences["sequence"] || ''} rows="3" onChange={this.handleChange.bind(this, "sequence")} placeholder="Enter organism/vector sequence" />
              </Form.Group>
              <Button className="btn-large" type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Sequences;