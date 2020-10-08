import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Sequences extends React.Component {
  sequenceData;

  constructor(props){
    super(props);
    this.state = {sequences: []};
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSequence = this.onChangeSequence.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.name = React.createRef();
  }

  onChangeName(e){
    this.setState({name: e.target.value})
  }

  onChangeDescription(e){
    this.setState({description: e.target.value})
  }

  onChangeSequence(e){
    this.setState({sequence: e.target.value})
  }

  handleChange(){
    this.setState({value: this.state.name})
  }

  onSubmit(e){
    alert('Your Sequence: ' + this.state.name + ' submitted.');
    console.log(`Name: ${this.state.name}`);
    e.preventDefault();
    const single_seq = { name: this.state.name,
                         description: this.state.description,
                         sequence: this.state.sequence}
    localStorage.setItem('sequences', JSON.stringify(single_seq))
    this.setState({
      name: '',
      description: '',
      sequence: ''
    })
  }

  componentDidMount(){
    // this.sequenceData = JSON.parse(localstorage.getItem('sequences'));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>GINKO-DNA</h1>
        </header>
        <div className="container">
          <h2>Submit Your DNA Sequence header</h2>
          <Form onSubmit = {this.onSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Organism/Vector Name:</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} placeholder="Enter organism/vector name" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription}  placeholder="Enter organism/vector description" />
            </Form.Group>
            <Form.Group controlId="formSequence">
              <Form.Label>DNA Sequence</Form.Label>
              <Form.Control as="textarea" value={this.state.sequence} rows="3" onChange={this.onChangeSequence} placeholder="Enter organism/vector sequence" />
            </Form.Group>
            <Button className="btn-large" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Sequences;