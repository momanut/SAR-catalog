import { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../CSS/Request.css'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'
import logo from "../Image/gistda-logo-png.png"
import Spinner from 'react-bootstrap/Spinner'
import {Badge,Modal} from 'react-bootstrap'
import { Icon } from '@iconify/react';


class Request extends Component{
    constructor(props){
        super(props)
        
        this.state={
            satellite : "",
            type : "",
            insert_request : "",
            work_order_id : "",
            order_id : "",
            pr_id : "",
            ar_counter : "",
            dtos_id : "",
            acq_date : "",
            start_time : "",
            stop_time : "",
            sensor_mode : "",
            level : "",
            format : "",
            direction : "",
            angle : '',
            polarization : '',
            aoi_tl_n : '',
            aoi_tl_e : '',
            aoi_tr_n : '',
            aoi_tr_e : '',
            aoi_br_n : '',
            aoi_br_e : '',
            aoi_bl_n : '',
            aoi_bl_e : '',
            area : '',
            waiting : '',
            description : '',
            remark : '',
            operator : '',
            qty : '',
            package : '',
            troble_ticket : '',
            show : false,
            fileinput : null
        }

    
    }
    addbtn=()=>{
        console.log(this.state)
    }
    showUploadFile=()=>{
        this.setState({show:true})
    }
    closeUploadFile=()=>{
        this.setState({show:false})
    }
    uploadFile=(e)=>{
        console.log(e.target.files[0]);
    }
    

    render(){
        return(
            <div style={{width:'100%'}}>
                <div id="firstsection">
                    
                </div>
                <div id="toolbar" >
                        <Button variant="primary" id="toolbutton" href="/workorder">WORK ORDER</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/request">NEW REQUESE</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/cart">CART</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/history">HISTORY</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/login">LOG OUT</Button>{' '}
                </div>
                <div style={{display:"flex", justifyContent:"center", margin:"10px"}}>
                    <Badge bg="primary" style={{fontSize:"32px"}}>Request</Badge> 
                </div>
                <div >                                       
                    <div id='formbg1'>
                        <Form id='formbg2' style={{backgroundColor:"lightblue"}}>
                            <Form.Group  id='formbg3' >
                                <div style={{display:"flex",marginRight:"auto",alignItems:"center"}}>
                                    <Form.Label  id='inputtext'>Browser shape file</Form.Label>
                                </div>                                
                                <div style={{display:"flex",marginLeft:"auto",alignItems:"center"}}>
                                    <Button variant="outline-primary" onClick={this.showUploadFile}>
                                        Upload
                                    </Button>
                                </div>                               
                                <Modal size="sm" show={this.state.show} onHide={this.closeUploadFile}>
                                    <Modal.Header closeButton>
                                    <Modal.Title >Upload File</Modal.Title>
                                    </Modal.Header>
                                        <Modal.Body id="modelButton" >
                                        <label >
                                            <input type="file" style={{display:"none"}} onChange={this.uploadFile} />
                                            <Icon icon="ant-design:file-add-outlined" color="white" height="72" />
                                        </label>
                                                                           
                                        <h4 style={{color:"white"}}>
                                            SHP FILE
                                        </h4>
                                        </Modal.Body>
                                    <Modal.Footer>
                                    
                                    </Modal.Footer>
                                </Modal>

                            </Form.Group>
                            <Form.Group id='formbg3'  >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' >
                                    Satellite
                                    </Form.Label>
                                    <Col >
                                        <Form.Select id='inputcontroldropdown' onChange={(e)=>{this.setState({satellite:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="cosmo">COSMO SKYMED</option>
                                            <option value="radsat">RADASAT</option>
                                            <option value="theos">THEOS</option>
                                        </Form.Select>
                                    </Col>
                                </div>                            
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Type
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({type:e.target.value})}} />
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Insert Request
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({insert_request:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Work Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({work_order_id:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({order_id:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                PR ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({pr_id:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                AR COUNTER
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({ar_counter:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                DTOs ID
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({dtos_id:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                ACQs Date
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({acq_date:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Start Time
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({start_time:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Stop Time
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({stop_time:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' column sm="2" >
                                        Sensor Mode
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({sensor_mode:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>                         
                            </Form.Group>
                            <Form.Group id='formbg3'  >                            
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' column sm="2" >
                                        Level
                                    </Form.Label>
                                    <Col >
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({level:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>
              
                            </Form.Group>
                            <Form.Group id='formbg3'  >                            

                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Format
                                    </Form.Label>
                                    <Col> 
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({format:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>

                            </Form.Group>
                            <Form.Group id='formbg3'  >                                
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Direction
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({direction:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Angle
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({angle:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                           
                            <Form.Group id='formbg3' style={{justifyContent:"flex-start"}} >
                                <Form.Label id='inputtext' >
                                AOI
                                <div style={{display:'flex',marginLeft:"20%",flexDirection:'row'}}>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        TL
                                        <Form.Control  id='aoi3' type="text" placeholder="TL" onChange={(e)=>{this.setState({aoi_tl_n:e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        TR
                                        <Form.Control  id='aoi3' type="text" placeholder="TR" onChange={(e)=>{this.setState({aoi_tr_n:e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BR
                                        <Form.Control  id='aoi3' type="text" placeholder="BR" onChange={(e)=>{this.setState({aoi_br_n:e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BL
                                        <Form.Control  id='aoi3' type="text" placeholder="BL" onChange={(e)=>{this.setState({aoi_br_n:e.target.value})}} />
                                        </Form.Label>
                                    </div>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({aoi_tl_e:e.target.value})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({aoi_tr_e:e.target.value})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({aoi_br_e:e.target.value})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({aoi_bl_e:e.target.value})}}/>
                                            <Form.Label style={{marginLeft:"5%"}} >
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                    </div>

                                </div>
                                </Form.Label>
                            </Form.Group>
                                
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Area
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({area:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Waiting
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({waiting:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Description
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' style={{maxHeight:'200px',minHeight:"200px", width:"auto"}} as="textarea" placeholder="Text" onChange={(e)=>{this.setState({description:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Remark
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({remark:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Operator
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({operator:e.target.value})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >                                
                   
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                        QTY (Scene)
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({qty:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>
                          
                            </Form.Group>
                            <Form.Group id='formbg3'  >                               
                           
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Polarization
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({polarization:e.target.value})}}>
                                            <option>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Col>
                                </div>
            
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Trouble Ticket
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({troble_ticket:e.target.value})}}/>
                                    
                                </Col>
                            </Form.Group>
                            <div style={{display:'flex',FlexDirection:'row',justifyContent:"center"}}>
                                <Button variant="success" id="requestbtn" onClick={this.addbtn}>ADD</Button>
                                <Button variant="danger" id="requestbtn">Clear</Button>
                            </div>
                        </Form>  
                    
                    </div>
                    <div style={{backgroundSize:'cover',backgroundColor:'black'}}>
                     
                    </div>
                </div>
                
            </div>

        );
    }
}
export default Request