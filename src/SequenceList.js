import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SequenceList extends React.Component {
  constructor(props){
    super(props);
    let sequenceList = JSON.parse(localStorage.getItem('sequences')) || [{}];
    this.state = {sequenceList: sequenceList};
  }

  componentDidMount(){

  }
  render(){
   // const lists = Object.keys(this.state.SequenceList);
    let obj = this.state.sequenceList;
    let list = [...obj];
    console.log(list);
    return(
      <div className="col-md-8">
        <h1>List of Sequences:</h1>

        {list.map((gene, index) => (
          <div className="card">
            <div className="card-body">
              <ul>
                <li key={index}>
                  <div>Name: {gene.sequenceName}</div>
                  <div>Description: {gene.sequenceDescription}</div>
                  <div>Sequence: {gene.sequence}</div>
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