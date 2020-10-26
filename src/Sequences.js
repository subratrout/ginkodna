import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom'

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach((value) => value.length > 0 && (valid = false));
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
                    sequence: '',
                    commonError: ''
                  },
                  sequenceList: JSON.parse(localStorage.getItem('sequences')) || [{}]
                };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log("SequenceList is in prop: " + this.state.sequenceList);
  }
  handleChange(e) {
    e.preventDefault();
    const {name, value} = e.target;
    let errors = this.state.errors;
    console.log("SequenceList is: " + this.state.sequenceList);
    console.log("Errors on handleChange: " + this.state.errors);
    switch(name){
      case 'name':
        errors.name = value.length < 3 || value ==="" ? 'Name of sequence must be 3 characters long': '';
        break;
      case 'description':
        errors.description = value.length < 3 ? 'Description must be 3 characters long': '';
        break;
      case 'sequence':
        const seqPattern = new RegExp('^[ATCG]*$', 'i');
        const validSequence = seqPattern.test(String(value).toUpperCase());
        errors.sequence = !validSequence ? 'Please only enter A T G C': '';
        const checkSequence = obj => obj.sequence === value.toUpperCase();
        console.log("SequenceList is: "+ this.sequenceList);
        const checkSequenceExists = this.state.sequenceList.some(checkSequence);
        if (checkSequenceExists){
          errors.sequence =  "Sequence already exists";
        }else if(!validSequence) {
          errors.sequence = "Please only enter A T G C";
        }
        break;
      default: 
        break;
    }
    this.setState({ [name]: value, errors});
  }

  handleSubmit(e){
    let errors = this.state.errors;
    if (e.target.name.value === "" || e.target.description.value === "" || e.target.sequence.value ===""){
      errors.commonError = "Form can't be empty";
      this.setState({commonError: "Form cant be empty", errors});
    }
    console.log("Errors on handleSubmit: " + this.state.errors);
    e.preventDefault();

    if(validateForm(this.state.errors)){
      const sequenceData = JSON.parse(localStorage.getItem('sequences')) || [];
      alert('Your Sequence: ' + this.state.name + ' submitted.');
      console.log(`Name: ${this.state.name} description: ${this.state.description} sequence: ${this.state.sequence}`);

      const single_seq = {
        sequenceName: this.state.name,
        sequenceDescription: this.state.description,
        sequence: this.state.sequence.toUpperCase()
      };
      sequenceData.push(single_seq);
      localStorage.setItem('sequences', JSON.stringify(sequenceData));
      this.props.history.push('/list-sequences');
  
      console.log("valid form");
      console.log("isValidateForm(this.state.errors): " +validateForm(this.state.errors));
      console.log("this.state.errors: " + this.state.errors);
 
    }else {
      console.log('Invalid Form error')
      console.log(this.state.errors);
      return false;
    }

    
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
            <Form onSubmit={this.handleSubmit} >
              <Form.Group controlId="formName">
                <Form.Label>Organism/Vector Name:</Form.Label>          
                <Form.Control type="text" name= "name" onChange={this.handleChange} placeholder="Enter organism/vector name" />
                <div style={{fontSize: 12, color: "red"}}>
                  {errors.name}
                </div>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <div style={{ fontSize: 12, color: "red" }}>
                  {errors.description}
                </div>
                <Form.Control type="text" name="description" onChange={this.handleChange} placeholder="Enter organism/vector description" />
              </Form.Group>
              <Form.Group controlId="formSequence">
                <Form.Label>DNA Sequence</Form.Label>
                <Form.Control as="textarea" name="sequence" rows="3" onChange={this.handleChange} placeholder="Enter organism/vector sequence" />
                <div style={{ fontSize: 12, color: "red" }}>
                  {errors.sequence}
                </div>
              </Form.Group>
                <div className="common-Error" style={{ fontSize: 12, color: "red" }}>
                  {errors.commonError}
                </div>
              <Button className="btn-large" type="submit">Create</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Sequences);