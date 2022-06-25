import { Component, useState } from "react";
import {login} from "../action/Events"
import { connect } from 'react-redux';
import {Button, Form, Modal} from 'react-bootstrap'

import '../CSS/login.css'

import logo from "../Image/gistda-logo-png.png"
import  Axios  from "axios";

import { Navigate,useNavigate } from "react-router-dom";

const Login =(props)=>{

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const nevigate = useNavigate()
  const handlerUser=(e)=>{
    setUsername(e.target.value)
  }
  const handlerPassword=(e)=>{
    setPassword(e.target.value)
  }
  const handleLogin=()=>{

    if(username === ''|| password === ''){
      handleShow()
    }
    else{
      Axios.get('http://localhost:3001/getuser/'+username+'/' + password).then((response)=>{
        
        console.log(response.data);
        if(response.data.length === 0){
          console.log("MAI TONG");
          handleShow()
        }else{
          console.log("TONG");
          const data = {
            username : response.data[0].username,
            email : response.data[0].email,
            name : response.data[0].firstname
          }
          props.setuser(data)
          if(response.data[0].role === 'admin'){
            nevigate('/workorder')
          }else{
            nevigate('/request')
          }
        }
      })
    }
    
    // const data={
    //   username:this.state.username,
    //   email:this.state.password,
    //   name:this.state.username
    // }
    // console.log(data)
    // this.props.setuser(data)
  }

  return (
      <div id='bgLogin'>
        <div id="imageIcon" >
          <img src={logo} id='logoImage'/>
        </div>
  
        <div id='bgFromLogin' >
          <Form id='formLogin'>
              <Form.Group className="mb-3" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control placeholder="Username"id='Inputbox' onChange={handlerUser} required/>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" id='Inputbox' onChange={handlerPassword} required/>
              </Form.Group>
              <Button variant="dark" id='loginButton' onClick={handleLogin}>Login</Button>
              <div id='bgRegisandForget' >
                  <Button variant="dark" id='RegisterandForgetbutton' href="/register" >Register</Button>
                  <Button variant="dark" id='RegisterandForgetbutton'  >Forget password</Button>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              
              
          </Form>
          
        </div>      
      </div>
      
    );

}
const mapStateToProps = (state) => ({ 
  user:state.Reducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  setuser: (item) => dispatch(login(item))

});

export default connect(mapStateToProps,mapDispatchToProps)(Login);