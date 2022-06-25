import { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../CSS/Request.css'
import Col from 'react-bootstrap/Col'

import {Badge,Modal} from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { connect } from 'react-redux';
import  Axios  from "axios";
class EditRad extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:this.props.editdata,
            showModal:false,
            modalTitle : '',
            modalBody : '',
            aoi:this.props.aoi
        } 
    }
    componentDidMount=()=>{
        // console.log(this.props.editdata)
        // console.log(this.props.aoi);
    }

    addbtn=()=>{
        if(this.props.requestdata.satellite === '' ||
        // this.state.data.type === '' ||
        this.state.data.insert_request === ''||
        this.state.data.work_order_id=== '' ||
        this.state.data.order_id=== '' ||
        // this.state.data.pr_id=== '' ||
        // this.state.data.ar_counter=== '' ||
        // this.state.data.dtos_id=== '' ||
        this.state.data.acq_date=== '' ||
        this.state.data.start_time=== '' ||
        this.state.data.stop_time=== '' ||
        this.state.data.sensor_mode=== '' ||
        this.state.data.beam_type=== '' ||
        // this.state.data.level=== '' ||
        this.state.data.format=== '' || 
        // this.state.data.direction=== '' ||
        // this.state.data.angle=== '' ||
        this.state.data.polarization=== '' ||
        this.state.data.aoi_tl_n=== '' || 
        this.state.data.aoi_tl_e=== '' ||
        this.state.data.aoi_tr_n=== '' ||
        this.state.data.aoi_tr_e=== '' ||
        this.state.data.aoi_br_n=== '' ||
        this.state.data.aoi_br_e=== '' ||
        this.state.data.aoi_bl_n=== '' ||
        this.state.data.aoi_bl_e=== '' ||
        this.state.data.area=== '' ||
        this.state.data.status=== ''  ||    
        this.state.data.remark=== '' ||
        this.state.data.operator=== '' ||
        this.state.data.customer=== '' ||
        this.state.data.organization=== '' ||
        this.state.data.project=== '' ||
        this.state.data.qty=== '' ||
        this.state.data.priority=== '' ||
        // this.state.data.package=== ''         
        this.state.data.acq_id=== '' 
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
        Axios.post('http://localhost:3001/create_satdata_input/',{
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
            aoi_tl_n : this.state.data.aoi_tl_n,
            aoi_tl_e : this.state.data.aoi_tl_e,
            aoi_tr_n : this.state.data.aoi_tr_n,
            aoi_tr_e : this.state.data.aoi_tr_e,
            aoi_br_n : this.state.data.aoi_br_n,
            aoi_br_e : this.state.data.aoi_br_e,
            aoi_bl_n : this.state.data.aoi_bl_n,
            aoi_bl_e : this.state.data.aoi_bl_e,
            area : this.state.data.area,
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
                                <Form.Label id='inputtext' column sm="2" >
                                Work Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" defaultValue={"RAD-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"} onChange={(e)=>{this.setState({data:{...this.state.data,work_order_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Order ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,order_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                AR COUNTER
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,ar_counter: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                ACQs ID 
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,acq_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                ACQs Date (DDMMYYYY)
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,acq_date: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Start Time (HHMMSS)
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,start_time: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Stop Time  (HHMMSS)
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,stop_time: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3' >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' column sm="2" >
                                        Sensor Mode
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,sensor_mode: e.target.value}})}}>
                                            
                                            <option value="Standard">Standard</option>
                                            <option value="Wide">Wide</option>
                                            <option value="Fine">Fine</option>
                                            <option value="Wide Fine">Wide Fine</option>
                                            <option value="Low Incidence">Low Incidence</option>
                                            <option value="High Incidence">High Incidence</option>
                                            <option value="Multi-Look Fine">Multi-Look Fine</option>
                                            <option value="Ultra Fine">Ultra Fine</option>
                                            <option value="Wide Ultra Fine">Wide Ultra Fine</option>
                                            <option value="Extra Fine">Extra Fine</option>
                                            <option value="Standard Quad Polazation">Standard Quad Polazation</option>
                                            <option value="Wide Standard Quad Polazation">Wide Standard Quad Polazation</option>
                                            <option value="Fine Quad Polazatio">Fine Quad Polazation</option>
                                            <option value="Wide Fine Quad Polazation">Wide Fine Quad Polazation</option>
                                            <option value="scanSAR Narrow">ScanSAR Narrow</option>
                                            <option value="scanSAR Wide">ScanSAR Wide</option>
                                            <option value="spot A">Spotlight A</option>
                                        </Form.Select>
                                    </Col>
                                </div>                         
                            </Form.Group>
                            <Form.Group id='formbg3'  >                            
                                <Form.Label id='inputtext' column sm="2" >
                                    Beam Type
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,beam_type: e.target.value}})}}/>                            
                                </Col>
              
                            </Form.Group>
                            <Form.Group id='formbg3'  >                       

                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Format
                                    </Form.Label>
                                    <Col> 
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,format: e.target.value}})}}>
                                            <option> </option>
                                            <option value="HDF5">HDF5</option>
                                            <option value="GEOTIFF">GEOTIFF</option>
                                            <option value="JPEG">JPEG</option>
                                            <option value="HTML">HTML</option>
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
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,polarization: e.target.value}})}}>
                                            <option></option>
                                            <option value="HH">HH</option>
                                            <option value="HV">HV</option>
                                            <option value="VH">VH</option>
                                            <option value="VV">VV</option>
                                            <option value="HH+HV">HH+HV</option>
                                            <option value="VV+VH">VV+VH</option>
                                            <option value="HH+VV+HV+VH">HH+VV+HV+VH</option>                                   
                                            
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
                                        <Form.Control  id='aoi3' type="text" placeholder="TL" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_tl_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        TR
                                        <Form.Control  id='aoi3' type="text" placeholder="TR" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_tr_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BR
                                        <Form.Control  id='aoi3' type="text" placeholder="BR" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_br_n: e.target.value}})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BL
                                        <Form.Control  id='aoi3' type="text" placeholder="BL" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_bl_n: e.target.value}})}} />
                                        </Form.Label>
                                    </div>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_tl_e: e.target.value}})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_tr_e: e.target.value}})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_br_e: e.target.value}})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="" onChange={(e)=>{this.setState({data:{...this.state.data,aoi_bl_e: e.target.value}})}}/>
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
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,area: e.target.value}})}}/>
                                </Col>
                            </Form.Group> 
                            <Form.Group id='formbg3'  >                   

                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Status
                                    </Form.Label>
                                    <Col> 
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,status: e.target.value}})}}>
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
                                    <Form.Control id='inputcontroltext'  type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,customer: e.target.value}})}}/>
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Organization
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,organization: e.target.value}})}}/>
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Project
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,project: e.target.value}})}}/>
                                    
                                </Col>
                            </Form.Group>                       
                         
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Remark
                                </Form.Label>
                                <Col>                                    
                                    <Form.Control id='inputcontroltext' style={{maxHeight:'200px',minHeight:"200px", width:"auto"}} as="textarea" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,remark: e.target.value}})}}/>
                                
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
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,qty: e.target.value}})}}/>
                                    </Col>
                                </div>
                          
                            </Form.Group>
                            
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                    Priority
                                </Form.Label>
                                <Col >
                                    
                                    <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,priority: e.target.value}})}}>
                          
                                            <option value="1">Standard</option>
                                            <option value="2">Fast</option>
                                            <option value="3">Emergency</option>                                            
                                        </Form.Select>
                                    
                                </Col>
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
                                <Button variant="success" id="requestbtn" onClick={this.addbtn}>ADD</Button>
                                <Button variant="danger" id="requestbtn" onClick={this.clearbtn} >Clear</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(EditRad)