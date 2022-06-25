import React, { Component, useState } from "react";
import {Button,Form,Modal} from 'react-bootstrap'

import '../CSS/login.css'
import '../CSS/Register.css'
import logo from "../Image/gistda-logo-png.png"
import  Axios  from "axios";
import { connect } from 'react-redux';
import { Navigate,useNavigate } from "react-router-dom";
import validator from 'validator';

const Register =(props)=>{

    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [username,setUsername] = useState('')
    const [agency,setAgency] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword,setConfirmpassword] = useState('') 

    const [show, setShow] = useState(false)
    const [modalTitle,setModalTitle] =useState('')
    const [modalBody,setModalBody] = useState('')
    
    const nevigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onRegister=()=>{
        if(firstname === '' || lastname === '' ||username === '' ||
        agency === '' ||email === '' ||password === '' || confirmpassword === ''){      
            
            setModalTitle('Something is missing')
            setModalBody('Please fill all text box')
            handleShow()
        }else if(!validator.isEmail(email)){
            setModalTitle('Email is invalid')
            setModalBody('Please try again')
            handleShow()
        }else if (password !== confirmpassword){
            setModalTitle('Password not match')
            setModalBody('Please try again')
            handleShow()
        }else{
            Axios.get('http://localhost:3001/getregister/'+username).then((response)=>{
        
            console.log(response.data);
            if(response.data.length === 0){
                console.log("MAI TONG");                      
                register()
            }else{
                console.log("TONG");
                setModalTitle('Username has already used')
                setModalBody('Please try again')
                handleShow()
                
            }
            })
        }
    }

    const register=()=>{
        Axios.post('http://localhost:3001/create_user/',{
            firstname : firstname,
            lastname : lastname,
            username : username,
            email : email,
            password : password,
            agency: agency,    
        })
        console.log("Posting")
    }
   
    return (
            <div id='bgRegister'>                
                <div id='bginp'>
                    <h3 style={{display:'flex',justifyContent:'center'}}>Register</h3>
                    <div style={{disply:'flex'}}>
                        <Form id='bgformLogin2' >
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setFirstname(e.target.value)} size='sm' type="text" placeholder="Enter First Name" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setLastname(e.target.value)} type="text" placeholder="Enter Last Name" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Agency</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setAgency(e.target.value)} type="text" placeholder="Enter Agency" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>Password</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control style={{margin:'4px'}} onChange={(e)=>setConfirmpassword(e.target.value)} type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Form.Group style={{marginTop:'2%'}} className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Confirm All" />
                            </Form.Group>
                            <Button style={{width:'100%',backgroundColor:'green',borderRadius:'10px'}} onClick={onRegister} >
                                Submit
                            </Button>
                            <Button style={{width:'100%',backgroundColor:'red',marginTop:'2%',borderRadius:'10px'}} type="Cancel"  href="/login">
                                Cancel
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>{modalTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{modalBody}</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    OK
                                </Button>
                                </Modal.Footer>
                            </Modal>                     
                        </Form>
                    </div>
                    
                </div>
                
            </div>
    
        );

}
const mapStateToProps = (state) => ({ 
    
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(Register);