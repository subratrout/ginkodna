import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Button from 'react-bootstrap/Button';

class SequenceList extends React.Component {

  constructor(props){
    super(props);
    let sequenceList = JSON.parse(localStorage.getItem('sequences')) || [{}];
    this.state = {sequences: sequenceList, filtered: [sequenceList], showModal: false,
      sequenceName: '', sequenceDescription: '', sequence: 'item.sequence', selectedName: '', selectedSequence:'', selectedDescription:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.setState({showModal: false});
  }

  handleShow(sequence){
    console.log("Handle show clicked"+ sequence.sequence)
    this.setState({showModal:true, selectedName: sequence.sequenceName, selectedSequence: sequence.sequence, selectedDescription: sequence.sequenceDescription});
  }

  componentDidMount(){
    this.setState({
      filtered: this.state.sequences
    })
    console.log(this.state.sequences);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.sequences
    });
  }

  truncateSequence(str, num) {
    if (str && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  handleChange(e){
    let currentList = [];

    let newList = [];
    
    if(e.target.value !== ''){
      currentList = this.state.sequences;
      newList = currentList.filter(sequence=>{
        const seq = sequence.sequenceName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return seq.includes(filter);

      });
    } else {
      newList = this.state.sequences;
    }
    this.setState({
      filtered: newList
    });

  }
  render(){
    return(
      
      <div className="col-md-8">
        
        <h3>List of Sequences:</h3>
        <a
          className="pull-right btn btn-primary"
          style={{ margin: 10 }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(this.state.sequences)
          )}`}
          download="data.json">
          DOWNLOAD DATA AS JSON
        </a>
        <label htmlFor="search">Search sequence by name:</label>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />

        {this.state.filtered.map((gene, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <ul>
                <li >
                  <div>
                    <button onClick={() => this.handleShow(gene)}>
                      <h4>{gene.sequenceName}</h4>
                    </button>
                  </div>
                  <div>Description: {gene.sequenceDescription}</div>
                  <div>Sequence: {this.truncateSequence(gene.sequence, 5)}</div>

                </li>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton>
        <Modal.Title>{this.state.selectedName}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Sequence: <p>{this.state.selectedSequence}</p>
                      Description: <p>{this.state.selectedDescription}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                      </Button>
                  </Modal.Footer>
                </Modal>
              </ul>
            </div>
          </div>
          
        ))}


      </div>
    )
  }
}

export default SequenceList;