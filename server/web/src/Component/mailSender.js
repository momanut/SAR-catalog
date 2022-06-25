import { Button,Form } from "react-bootstrap";
import { Component } from "react";


class MailSender extends Component{
    constructor(props){
        super(props)       
        this.state ={
            name:'',
            email:'',
            message:'',
            emailStatus:'',
        } 
        
    }
    sendingMail=(e)=>{ 
        const {
            name,
            email,
            message
        } = this.state
        console.log(this.state.name);
        console.log(this.state.email);
        console.log(this.state.message);
        var xhr = new XMLHttpRequest

        xhr.addEventListener('load',()=>{
            console.log(xhr.responseText);
        });
        xhr.open('GET', 'http://ThirdTestServer/index.php?sendto=' + email + 
                                '&name=' + name + 
                                '&message=' + message);
        // send the request
        xhr.send();

        // reset the fields
        this.setState({
            name: '',
            email: '',
            message: ''
        });
        e.preventDefault();

    }
    render(){
        return(
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>{this.setState({name:e.target.value})}} />              
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={(e)=>{this.setState({email:e.target.value})}} />              
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>message</Form.Label>
                        <Form.Control type="text" placeholder="Enter message" onChange={(e)=>{this.setState({message:e.target.value})}} />              
                    </Form.Group>
                </Form>
                <Button onClick={this.sendingMail}>
                    Submit
                </Button>
            </div>
        );
    }
}
export default MailSender