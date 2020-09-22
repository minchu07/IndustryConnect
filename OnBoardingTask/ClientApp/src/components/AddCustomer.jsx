import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button ,Container, Header} from 'semantic-ui-react';

class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Address: '',
    };
  }
}

Addstudent=()=>{  
    axios.post('Customers/PostCustomer', {Name:this.state.Name, Address:this.state.Address})  
  .then(json => {  
  if(json.data.Status==='Success'){  
    console.log(json.data.Status);  
    alert("Data Save Successfully");  
  this.props.history.push('/CustomerDetails')  
  }  
  else{  
  alert('Data not Saved');  
  debugger;  
  this.props.history.push('/CustomerDetails')  
  }  
  })  
  }  
     
  handleChange= (e)=> {  
  this.setState({[e.target.name]:e.target.value});  
  }  
     
  render() {  
  return (  
     <Container fluid className="App">  
      <h4 className="PageHeading">Enter Student Informations</h4>  
      <Form className="form">  
        <Col>  
          <FormGroup row>  
            <Label for="name" sm={2}>Name</Label>  
            <Col sm={10}>  
              <Input type="text" name="Name" onChange={this.handleChange} value={this.state.Name} placeholder="Enter Name" />  
            </Col>  
          </FormGroup>  
          <FormGroup row>  
            <Label for="address" sm={2}>RollNo</Label>  
            <Col sm={10}>  
              <Input type="text" name="RollNo" onChange={this.handleChange} value={this.state.RollNo} placeholder="Enter RollNo" />  
            </Col>  
          </FormGroup>  
          <FormGroup row>  
            <Label for="Password" sm={2}>Class</Label>  
            <Col sm={10}>  
              <Input type="text" name="Class" onChange={this.handleChange} value={this.state.Class} placeholder="Enter Class" />  
            </Col>  
          </FormGroup>  
          <FormGroup row>  
            <Label for="Password" sm={2}>Address</Label>  
            <Col sm={10}>  
              <Input type="text" name="Address" onChange={this.handleChange} value={this.state.Address} placeholder="Enter Address" />  
            </Col>  
          </FormGroup>  
        </Col>  
        <Col>  
          <FormGroup row>  
            <Col sm={5}>  
            </Col>  
            <Col sm={1}>  
            <button type="button" onClick={this.Addstudent} className="btn btn-success">Submit</button>  
            </Col>  
            <Col sm={1}>  
              <Button color="danger">Cancel</Button>{' '}  
            </Col>  
            <Col sm={5}>  
            </Col>  
          </FormGroup>  
        </Col>  
      </Form>  
    </Container>  
  );  
  }  
     
  }  
     
  export default AddCustomer; 
