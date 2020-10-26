import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class SequenceList extends React.Component {

  constructor(props){
    super(props);
    let sequenceList = JSON.parse(localStorage.getItem('sequences')) || [{}];
    this.state = {sequences: sequenceList, filtered: [sequenceList], showModal: false,
      sequenceName: '', sequenceDescription: '', sequence: 'item.sequence'};
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openModalwithSequence = this.openModalwithSequence.bind(this)
  }

  handleClose(){
    this.setState({showModal: false});
  }

  handleShow(){
    this.setState({showModal: true});
  }

  openModalwithSequence(item){
    this.setState({showModal: true, sequenceName: item.name, sequenceDescription: item.description, sequence: item.sequence})
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
                  <div>Name:<Link onClick={() => this.openModalwithSequence(gene)}>{gene.sequenceName}</Link> </div>
                  <div>Description: {gene.sequenceDescription}</div>
                  <div>Sequence: {this.truncateSequence(gene.sequence, 5)}</div>
                  <Modal show={this.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </li>
              </ul>
            </div>
          </div>
          
        ))}
      </div>
    )
  }
}

export default SequenceList;