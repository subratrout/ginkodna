import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(value => value.length > 0 && (valid = false));
  return valid;
}
class Sequences extends React.Component {

  constructor(props){
    super(props);
    this.state = {name: '', 
                  description: '', 
                  sequence: '', 
                  errors: {
                    name: '',
                    description: '',
                    sequence: ''
                  }
                };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.name = React.createRef();
  }
  handleChange(e) {
    e.preventDefault();
    const {name, value} = e.target;
    let errors = this.state.errors;
    switch(name){
      case 'name':
        errors.name = value.length < 3 ? 'Name of sequence must be 3 characters long': '';
        break;
      case 'description':
        errors.description = value.length < 3 ? 'Description must be 3 characters long': '';
        break;
      case 'sequence':
        const seqPattern = new RegExp('^[ATCG]*$', 'i');
        const validSequence = seqPattern.test(String(value).toUpperCase());
        errors.sequence = !validSequence ? 'Please only enter A T G C': '';
        break;
      default: 
        break;
    }
    this.setState({ [name]: value, errors});
  }

  handleSubmit(e){

    // let errors = [];

    // if (this.state.sequences.name.length < 3){
    //   errors.push('Name must be atleast 3 characters long');
    // }

    // if (this.state.sequences.description.length < 3) {
    //   errors.push('Description must be atleast 3 characters long');
    // }
   
    // console.log(validSequence);
    // if(!validSequence){
    //   errors.push('The sequence is not valid');
    // }

    // this.setState({
    //   errors: errors
    // });

    // if (errors.length > 0) {
    //   return false;
    // } else {
    //   alert("All form fields are valid. You can now submit the sequence!");
    // }

    e.preventDefault();
    if(validateForm(this.state.errors)){
      const sequenceData = JSON.parse(localStorage.getItem('sequences')) || [];
      alert('Your Sequence: ' + this.state.name + ' submitted.');
      console.log(`Name: ${this.state.name} description: ${this.state.description} sequence: ${this.state.sequence}`);

      const single_seq = {
        sequenceName: this.state.name,
        sequenceDescription: this.state.description,
        sequence: this.state.sequence
      };
      sequenceData.push(single_seq);
      localStorage.setItem('sequences', JSON.stringify(sequenceData))

      this.setState({ sequences: { name: '', description: '', sequence: '' } });
      console.log("valid form")
    }else {
      console.log('Invalid Form error')
    }
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount(){

  }

  render() {
    const { errors } = this.state;
    return (
      <div className="App">
        <header>
          <h1>GINKO-DNA</h1>
        </header>
        <div className="container">
          {console.log("The errors are" + errors.name + ":" + errors.description +":" + errors.sequence)}
          <h2>Submit Your DNA Sequence header</h2>
          <div className="col-md-6">
            <Form onSubmit={this.handleSubmit} noValidate >
              <Form.Group controlId="formName">
                <Form.Label>Organism/Vector Name:</Form.Label>          
                <Form.Control type="text" name= "name" onChange={this.handleChange} placeholder="Enter organism/vector name" />
                {errors.name.length > 0 &&
                  <span className='error'>{errors.name}</span>}
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" onChange={this.handleChange} placeholder="Enter organism/vector description" />
              </Form.Group>
              <Form.Group controlId="formSequence">
                <Form.Label>DNA Sequence</Form.Label>
                <Form.Control as="textarea" name="sequence" rows="3" onChange={this.handleChange} placeholder="Enter organism/vector sequence" />
              </Form.Group>
              <Button className="btn-large" type="submit">Create</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Sequences;