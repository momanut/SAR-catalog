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
import { connect } from 'react-redux';
import  Axios  from "axios";

class EditCosmo extends Component{
    constructor(props){
        super(props)       
        this.state ={
            data:this.props.editdata,
            showModal:false,
            modalTitle : '',
            modalBody : '',
            aoi:this.props.aoi
        } 
         console.log(this.props.editdata)
    }



    addbtn=()=>{        
        
        if(this.props.requestdata.satellite === '' ||
        //this.state.data.type === '' ||
        this.state.data.insert_request === ''||
        this.state.data.work_order_id=== '' ||
        this.state.data.order_id=== '' ||
        this.state.data.pr_id=== '' ||
        this.state.data.ar_counter=== '' ||
        this.state.data.dtos_id=== '' ||
        this.state.data.acq_date=== '' ||
        this.state.data.start_time=== '' ||
        this.state.data.stop_time=== '' ||
        this.state.data.sensor_mode=== '' ||
        //this.state.data.beam_type== '' ||
        this.state.data.level=== '' ||
        this.state.data.format=== '' || 
        this.state.data.direction=== '' ||
        this.state.data.angle=== '' ||
        this.state.data.polarization=== '' ||
        this.state.aoi.tl_n=== '' || 
        this.state.aoi.tl_e=== '' ||
        this.state.aoi.tr_n=== '' ||
        this.state.aoi.tr_e=== '' ||
        this.state.aoi.br_n=== '' ||
        this.state.aoi.br_e=== '' ||
        this.state.aoi.bl_n=== '' ||
        this.state.aoi.bl_e=== '' ||
        this.state.data.area=== '' ||
        this.state.data.status=== ''  ||    
        this.state.data.remark=== '' ||
        this.state.data.operator=== '' ||
        this.state.data.customer=== '' ||
        this.state.data.organization=== '' ||
        this.state.data.project=== '' ||
        this.state.data.qty=== '' ||
        this.state.data.priority=== '' ||
        this.state.data.package=== ''         
        //this.state.data.acq_id== '' 
        ){
            console.log("Missing something");
            console.log(this.props.requestdata.satellite);
            console.log(this.state.data.work_order_id);
            this.setState({modalTitle:"Something is missing!!!"})
            this.setState({modalBody:"Do you want to continue"})
            this.handleModalOpen()
        }else{
            console.log("OK");
            this.setState({modalTitle:"Confirm"})
            this.setState({modalBody:"Add to database"})
            this.handleModalOpen()
        }
        
    }
    addDatatoDB=()=>{
        this.postingData()
        this.handleModalClose()
    }

    postingData=()=>{
        Axios.post('http://localhost:3001/update_satdata_input/',{
            satellite : this.props.requestdata.satellite,
            type : this.state.data.type,
            insert_request : this.state.data.insert_request,
            work_order_id : this.state.data.work_order_id,
            order_id : this.state.data.order_id,
            pr_id : this.state.data.pr_id,
            ar_counter : this.state.data.ar_counter,
            dtos_id : this.state.data.dtos_id,
            acq_date : this.state.data.acq_date,
            start_time : this.state.data.start_time,
            stop_time : this.state.data.stop_time,
            sensor_mode : this.state.data.sensor_mode,
            beam_type : this.state.data.beam_type,
            level : this.state.data.level,
            format : this.state.data.format,
            direction : this.state.data.direction,
            angle : this.state.data.angle,
            polarization : this.state.data.polarization,
            tl_n : this.state.aoi.tl_n,
            tl_e : this.state.aoi.tl_e,
            tr_n : this.state.aoi.tr_n,
            tr_e : this.state.aoi.tr_e,
            br_n : this.state.aoi.br_n,
            br_e : this.state.aoi.br_e,
            bl_n : this.state.aoi.bl_n,
            bl_e : this.state.aoi.bl_e,
            area : this.state.aoi.area,
            status : this.state.data.status,       
            remark : this.state.data.remark,
            operator : this.state.data.operator,
            customer : this.state.data.customer,
            organization : this.state.data.organization,
            project : this.state.data.project,
            qty : this.state.data.qty,
            priority : this.state.data.priority,
            package : this.state.data.package,            
            acq_id : this.state.data.acq_id,
        })
        console.log("Posting")
    }
    handleModalOpen =()=>{
        this.setState({showModal:true})
    }
    handleModalClose=()=>{
        this.setState({showModal:false})
    }
    clearbtn=()=>{
        this.setState({data:this.props.requestdata})
        window.location.reload()
        // this.setState({
        //     data:{
        //         ...this.state.data,work_order_id: "sad"
        //     }
        // })
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
                
                <div >                                       
                    <div id='formbg1'>
                            
                        <Form id='formbg2' style={{backgroundColor:"lightblue"}}>                        
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Type
                                
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext'disabled value={this.state.data.type}/>
                                </Col>
                            </Form.Group> 
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Insert Request
                                </Form.Label>
                                <Col >
                                <Form.Control id='inputcontroltext'disabled value={this.props.insert_request}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' >
                                    Satellite
                                    </Form.Label>
                                    <Col >
                                        <Form.Select id='inputcontroldropdown' defaultValue={this.state.data.satellite} onChange={(e)=>{
                                            if(e.target.value === 'CSK1'){                                                                   
                                                this.setState({data:{...this.state.data,satellite: 'CSK1'}})
                                              
                                            }else if(e.target.value === 'CSK2'){
                        
                                                this.setState({data:{...this.state.data,satellite: 'CSK2'}})
                                         
                                            }else if(e.target.value === 'CSK3'){
                                  
                                                this.setState({data:{...this.state.data,satellite: 'CSK3'}})
                                    }else if(e.target.value === 'CSK4'){
                                                                         
                                                this.setState({data:{...this.state.data,satellite: 'CSK4'}})
                                           
                                            }
                                        }}>                                            
                                            <option value="CSK1">CSK1</option>
                                            <option value="CSK2">CSK2</option>
                                            <option value="CSK3">CSK3</option>
                                            <option value="CSK4">CSK4</option>
                                        </Form.Select>
                                    </Col>
                                    
                                </div>                            
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Work Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" onChange={(e)=>{this.setState({data:{...this.state.data,work_order_id: e.target.value}})}} defaultValue={this.state.data.work_order_id}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.order_id} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,order_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                PR ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.pr_id} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,pr_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                AR COUNTER
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.ar_counter}  placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,ar_counter: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                DTOs ID
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.dtos_id}  placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,dtos_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Col>
                                    <Form.Label id='inputtext' column sm="2" >
                                    ACQs Date (DDMMYYYY)
                                    </Form.Label>
                                </Col>                             
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.acq_date} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,acq_date: e.target.value}})}}/>
                                </Col>                                
                                
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Start Time (HHMMSS)
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.start_time} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,start_time: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Stop Time (HHMMSS)
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.stop_time} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,stop_time: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' column sm="2" >
                                        Sensor Mode
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.sensor_mode} onChange={(e)=>{this.setState({data:{...this.state.data,sensor_mode: e.target.value}})}}>
                                            <option> </option>
                                            <option value={1}>SP</option>
                                            <option value={2}>STR_HI</option>
                                            <option value={3}>STR_PP</option>
                                            <option value={4}>SCN_WIDE</option>
                                            <option value={5}>SCN_HUGE</option>
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
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.level} onChange={(e)=>{this.setState({data:{...this.state.data,level: e.target.value}})}}>
                                            <option> </option>
                                            <option value={1}>1A_SCSB</option>
                                            <option value={2}>1A_SCSU</option>
                                            <option value={3}>1B_DGM</option>
                                            <option value={4}>1C_GEC</option>
                                            <option value={5}>1D_GTC</option>
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
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.format} onChange={(e)=>{this.setState({data:{...this.state.data,format: e.target.value}})}}>
                                            <option> </option>
                                            <option value={1}>HDF5</option>
                                            <option value={2}>GEOTIFF</option>
                                            <option value={3}>JPEG</option>
                                            <option value={4}>HTML</option>
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
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.direction} onChange={(e)=>{this.setState({data:{...this.state.data,direction: e.target.value}})}}>
                                            <option> </option>
                                            <option value={1}>DL</option>
                                            <option value={2}>DR</option>
                                            <option value={3}>AL</option>
                                            <option value={4}>AR</option>
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Angle
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' defaultValue={this.state.data.angle} type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,angle: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >                               
                           
                           <div id="divfordropdown">
                               <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                               Polarization
                               </Form.Label>
                               <Col>
                                   <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.polarization} onChange={(e)=>{this.setState({data:{...this.state.data,polarization: e.target.value}})}}>
                                       <option> </option>
                                       <option value={1}>HH</option>
                                       <option value={2}>HV</option>
                                       <option value={3}>VH</option>
                                       <option value={4}>VV</option>
                                       <option value={5}>CO</option>
                                       <option value={6}>CH</option>
                                       <option value={7}>CV</option>
                                   </Form.Select>
                               </Col>
                           </div>
       
                       </Form.Group>
                            <Form.Group id='formbg3' style={{justifyContent:"flex-start"}} >
                                <Form.Label id='inputtext' >
                                AOI (AABBCC/DDDEEFF)
                                <div style={{display:'flex',marginLeft:"10%",flexDirection:'row'}}>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        TL
                                        <Form.Control  id='aoi3' type="text" defaultValue={this.state.aoi.tl_n} placeholder="TL" onChange={(e)=>{this.setState({aoi:{...this.state.aoi,tl_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        TR
                                        <Form.Control  id='aoi3' type="text" placeholder="TR"  defaultValue={this.state.aoi.tr_n} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,tr_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BR
                                        <Form.Control  id='aoi3' type="text" placeholder="BR" defaultValue={this.state.aoi.br_n} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,br_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BL
                                        <Form.Control  id='aoi3' type="text" placeholder="BL" defaultValue={this.state.aoi.bl_n} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,bl_n: e.target.value}})}} />
                                        </Form.Label>
                                    </div>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" defaultValue={this.state.aoi.tl_e} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,tl_e: e.target.value}})}} />
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" defaultValue={this.state.aoi.tr_e} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,tr_e: e.target.value}})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" defaultValue={this.state.aoi.br_e} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,br_e: e.target.value}})}} />
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" defaultValue={this.state.aoi.bl_e} onChange={(e)=>{this.setState({aoi:{...this.state.aoi,bl_e: e.target.value}})}} />
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
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={this.state.data.area} placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,area: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >              
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Status
                                    </Form.Label>
                                    <Col> 
                                        <Form.Select  id='inputcontroldropdown'  defaultValue={this.state.data.status} onChange={(e)=>{this.setState({data:{...this.state.data,status: e.target.value}})}} >
                                            <option value='waiting'>waiting</option>                                            
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group> 
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Customer
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" defaultValue={this.state.data.customer} onChange={(e)=>{this.setState({data:{...this.state.data,customer: e.target.value}})}} />
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Organization
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" defaultValue={this.state.data.organization} onChange={(e)=>{this.setState({data:{...this.state.data,organization: e.target.value}})}} />
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Project
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" defaultValue={this.state.data.project} onChange={(e)=>{this.setState({data:{...this.state.data,project: e.target.value}})}}/>
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Remark
                                </Form.Label>
                                <Col>
                                    
                                    <Form.Control id='inputcontroltext' defaultValue={this.state.data.remark} style={{maxHeight:'200px',minHeight:"200px", width:"auto"}} as="textarea" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,remark: e.target.value}})}} />
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                New remark
                                </Form.Label>
                                <Col>
                                    
                                    <Form.Control id='inputcontroltext' defaultValue={this.state.data.remark} style={{maxHeight:'200px',minHeight:"200px", width:"auto"}} as="textarea" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,remark: e.target.value}})}} />
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Operator
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' disabled type="Text" placeholder={this.state.data.operator}/>
                                </Col>
                            </Form.Group>                            
                            <Form.Group id='formbg3'  >                                
                   
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                        QTY (Scene)
                                    </Form.Label>
                                    <Col>                                        
                                        <Form.Control id='inputcontroltext' type="Text" placeholder="Text" defaultValue={this.state.data.qty} onChange={(e)=>{this.setState({data:{...this.state.data,qty: e.target.value}})}} />
                                    </Col>
                                </div>
                          
                            </Form.Group>
                            <Form.Group id='formbg3'  >                                
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Priority
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.priority} onChange={(e)=>{this.setState({data:{...this.state.data,priority: e.target.value}})}} >
                                            <option> </option>
                                            <option value= {1}>Standard</option>
                                            <option value={2}>Fast</option>
                                            <option value={3}>Emergency</option>                                            
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group>
                            <Form.Group id='formbg3'  >                                
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Package
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' defaultValue={this.state.data.package} onChange={(e)=>{this.setState({data:{...this.state.data,package: e.target.value}})}} >
                                            <option> </option>
                                            <option value={1}>Coherence Map </option>
                                            <option value={2}>Flood Series</option>
                                            <option value={3}>Maritime Series</option>
                                            <option value={4}>Interferometric Data Stack</option>
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group>  
                            <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>{this.state.modalTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.modalBody}</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleModalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.addDatatoDB}>
                                    OK
                                </Button>
                                </Modal.Footer>
                            </Modal>                             
                            
                            <div style={{display:'flex',FlexDirection:'row',justifyContent:"center"}}>
                                <Button variant="success" id="requestbtn" >Update</Button>
                                <Button variant="success" id="requestbtn" >Make backup</Button>
                                <Button variant="success" id="requestbtn" >Duplicate order</Button>
                                {/* <Button variant="success" id="requestbtn" onClick={this.addbtn}>ADD</Button> */}
                                {/* <Button variant="danger" id="requestbtn" onClick={this.clearbtn}>Clear</Button> */}
                                <Button variant="danger" id="requestbtn" >Reset</Button>
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
const mapStateToProps = (state) => ({ 
    user:state.Reducer.user,

});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(EditCosmo)