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
import ReadingSHP from "./readingshp";
class Cosmo extends Component{
    constructor(props){
        super(props)       
        this.state ={
            data:this.props.requestdata,
            showModal:false,
            modalTitle : '',
            modalBody : '',
            
            aoi_tl_n :'',
            aoi_tl_e :'',
            aoi_tr_n :'',
            aoi_tr_e :'',
            aoi_bl_n :'',
            aoi_bl_e :'',
            aoi_br_n :'',
            aoi_br_e :'',
        } 
        
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
        Axios.get('http://localhost:3001/count_work_order/',{
        }).then((response)=>{
            
            console.log(response.data[0].count)
            //this.setState({data:{...this.state.data,work_order_id:"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"+response.data[0].count}})
            this.postingData("CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"+response.data[0].count)
        })
        this.handleModalClose()
    }

    postingData=(woi)=>{
        Axios.post('http://localhost:3001/create_satdata_input/',{
            satellite : this.props.requestdata.satellite,
            type : this.state.data.type,
            insert_request : this.state.data.insert_request,
            work_order_id : woi,
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
            tl_n : this.state.aoi_tl_n,
            tl_e : this.state.aoi_tl_e,
            tr_n : this.state.aoi_tr_n,
            tr_e : this.state.aoi_tr_e,
            br_n : this.state.aoi_br_n,
            br_e : this.state.aoi_br_e,
            bl_n : this.state.aoi_bl_n,
            bl_e : this.state.aoi_bl_e,
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
    getAoi=(tl_n,tl_e,tr_n,tr_e,bl_n,bl_e,br_n,br_e)=>{
        // this.setState({aoi_tl_n:this.degtodms(tl_n,'n')})
        // this.setState({aoi_tl_e:this.degtodms(tl_e,'e')})
        // this.setState({aoi_tr_n:this.degtodms(tr_n,'n')})
        // this.setState({aoi_tr_e:this.degtodms(tr_e,'e')})
        // this.setState({aoi_bl_n:this.degtodms(bl_n,'n')})
        // this.setState({aoi_bl_e:this.degtodms(bl_e,'e')})
        // this.setState({aoi_br_n:this.degtodms(br_n,'n')})
        // this.setState({aoi_br_e:this.degtodms(br_e,'e')})
        var tln = this.degtodms(tl_n,'n')
        var tle = this.degtodms(tl_e,'e')
        var trn = this.degtodms(tr_n,'n')
        var tre = this.degtodms(tr_e,'e')
        var bln = this.degtodms(bl_n,'n')
        var ble = this.degtodms(bl_e,'e')
        var brn = this.degtodms(br_n,'n')
        var bre = this.degtodms(br_e,'e')
        this.setState({aoi_tl_n: tln})
        this.setState({aoi_tl_e: tle})
        this.setState({aoi_tr_n: trn})
        this.setState({aoi_tr_e: tre})
        this.setState({aoi_bl_n: bln})
        this.setState({aoi_bl_e: ble})
        this.setState({aoi_br_n: brn})
        this.setState({aoi_br_e: bre})
        console.log(this.degtodms(tl_n,'n'));
        console.log(this.degtodms(tl_e,'e'));
        console.log(this.degtodms(tr_n,'n'));
        console.log(this.degtodms(tr_e,'e'));
        console.log(this.degtodms(bl_n,'n'));
        console.log(this.degtodms(bl_e,'e'));
        console.log(this.degtodms(br_n,'n'));
        console.log(this.degtodms(br_e,'e'));

        
    }
    degtodms=(deg,type)=>{
        
        var d = Math.floor (deg);
        // console.log(d);        
        var minfloat = (deg-d)*60;
        var m = Math.floor(minfloat);
        var secfloat = (minfloat-m)*60;
        var s = Math.round(secfloat);
        // After rounding, the seconds might become 60. These two
        // if-tests are not necessary if no rounding is done.
        if (s==60) {
            m++;
            s=0;
        }
        if (m==60) {
            d++;
            m=0;
        }
        if(type === 'e'){
            var dagree = this.pad(d,3)
            var libda = this.pad(m,2)
            var filibda = this.pad(s,2)
        }else if(type === 'n'){
            var dagree = this.pad(d,2)
            var libda = this.pad(m,2)
            var filibda = this.pad(s,2)
        }
        console.log("DEG : ",deg)
        return (dagree + libda  + filibda);
    }
     pad = (num, size)=> {
        num = num.toString();
        while (num.length < size){ num = "0" + num}
        return num;
    }
    showlog=()=>{
        console.log(this.state.data);
    }

    render(){
        return(
            <div style={{width:'100%'}}>               
                
                <div >                                       
                    <div id='formbg1'>
                        <Form id='formbg2' style={{backgroundColor:"lightblue"}}>
                        <Form.Group  id='formbg3' >
                                <div style={{display:"flex",marginRight:"auto",alignItems:"center"}}>
                                    <Form.Label  id='inputtext'>Browser shape file</Form.Label>
                                </div>                                
                                <div style={{display:"flex",marginLeft:"auto",alignItems:"center"}}>
                                    <ReadingSHP getData={this.getAoi}/>
                                   
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
                                <Form.Label id='inputtext' column sm="2" >
                                Insert Request
                                </Form.Label>
                                <Col >
                                <Form.Control id='inputcontroltext'disabled value={this.state.data.insert_request}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Work Order ID
                                </Form.Label>
                                <Col >
                                <Form.Control id='inputcontroltext' type="Text" readOnly  defaultValue={'auto generate'}/>
                                    {/* <Form.Control id='inputcontroltext' type="Text" readOnly onChange={(e)=>{this.setState({data:{...this.state.data,work_order_id: e.target.value}})}} defaultValue={"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"}/> */}
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
                                PR ID
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,pr_id: e.target.value}})}}/>
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
                                DTOs ID
                                </Form.Label>
                                <Col>
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,dtos_id: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Col>
                                    <Form.Label id='inputtext' column sm="2" >
                                    ACQs Date (DDMMYYYY)
                                    </Form.Label>
                                </Col>                             
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
                                Stop Time (HHMMSS)
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
                                            <option> </option>
                                            <option value="1">SP</option>
                                            <option value="2">STR_HI</option>
                                            <option value="3">STR_PP</option>
                                            <option value="4">SCN_WIDE</option>
                                            <option value="5">SCN_HUGE</option>
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
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,level: e.target.value}})}}>
                                            <option> </option>
                                            <option value="1">1A_SCSB</option>
                                            <option value="2">1A_SCSU</option>
                                            <option value="3">1B_DGM</option>
                                            <option value="4">1C_GEC</option>
                                            <option value="5">1D_GTC</option>
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
                                    Direction
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,direction: e.target.value}})}}>
                                            <option> </option>
                                            <option value="DL">DL</option>
                                            <option value="DR">DR</option>
                                            <option value="AL">AL</option>
                                            <option value="AR">AR</option>
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Form.Group>
                            <Form.Group id='formbg3' >
                                <Form.Label id='inputtext' column sm="2" >
                                Angle
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,angle: e.target.value}})}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >                               
                           
                           <div id="divfordropdown">
                               <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                               Polarization
                               </Form.Label>
                               <Col>
                                   <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,polarization: e.target.value}})}}>
                                       <option> </option>
                                       <option value="HH">HH</option>
                                       <option value="HV">HV</option>
                                       <option value="VH">VH</option>
                                       <option value="VV">VV</option>
                                       <option value="CO">CO</option>
                                       <option value="CH">CH</option>
                                       <option value="CV">CV</option>
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
                                        <Form.Control  id='aoi3' type="text" placeholder="TL" defaultValue={this.state.aoi_tl_n} onChange={(e)=>{this.setState({aoi_tl_n: e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        TR
                                        <Form.Control  id='aoi3' type="text" placeholder="TR" defaultValue={this.state.aoi_tr_n} onChange={(e)=>{this.setState({aoi_tr_n: e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BR
                                        <Form.Control  id='aoi3' type="text" placeholder="BR"defaultValue={this.state.aoi_br_n} onChange={(e)=>{this.setState({aoi_br_n: e.target.value})}} />
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        BL
                                        <Form.Control  id='aoi3' type="text" placeholder="BL" defaultValue={this.state.aoi_bl_n}onChange={(e)=>{this.setState({aoi_bl_n: e.target.value})}} />
                                        </Form.Label>
                                    </div>
                                    <div id="aoi1">
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="TL" defaultValue={this.state.aoi_tl_e} onChange={(e)=>{this.setState({aoi_tl_e: e.target.value})}} />
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="TR" defaultValue={this.state.aoi_tr_e} onChange={(e)=>{this.setState({aoi_tr_e: e.target.value})}}/>
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="BR" defaultValue={this.state.aoi_br_e} onChange={(e)=>{this.setState({aoi_br_e: e.target.value})}} />
                                            <Form.Label style={{marginLeft:"5%"}}>
                                                E
                                            </Form.Label>
                                        </Form.Label>
                                        <Form.Label id='aoi2'  >
                                        N/
                                        <Form.Control  id='aoi3' type="text" placeholder="BL" defaultValue={this.state.aoi_bl_e} onChange={(e)=>{this.setState({aoi_bl_e: e.target.value})}} />
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
                                        <Form.Select  id='inputcontroldropdown'  onChange={(e)=>{this.setState({data:{...this.state.data,status: e.target.value}})}} >
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
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,customer: e.target.value}})}} />
                                    
                                </Col>
                            </Form.Group>
                            <Form.Group id='formbg3'  >
                                <Form.Label id='inputtext' column sm="2" >
                                Organization
                                </Form.Label>
                                <Col >
                                    <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,organization: e.target.value}})}} />
                                    
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
                                    
                                    <Form.Control id='inputcontroltext' style={{maxHeight:'200px',minHeight:"200px", width:"auto"}} as="textarea" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,remark: e.target.value}})}} />
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
                                        <Form.Control id='inputcontroltext' type="Text" placeholder="Text" onChange={(e)=>{this.setState({data:{...this.state.data,qty: e.target.value}})}} />
                                    </Col>
                                </div>
                          
                            </Form.Group>
                            <Form.Group id='formbg3'  >                                
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' style={{marginLeft:'0%'}}column sm="2" >
                                    Priority
                                    </Form.Label>
                                    <Col>
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,priority: e.target.value}})}} >
                                            <option> </option>
                                            <option value="Standard">Standard</option>
                                            <option value="Fast">Fast</option>
                                            <option value="Emergency">Emergency</option>                                            
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
                                        <Form.Select  id='inputcontroldropdown' onChange={(e)=>{this.setState({data:{...this.state.data,package: e.target.value}})}} >
                                            <option> </option>
                                            <option value="Coherence Map">Coherence Map </option>
                                            <option value="Flood Series">Flood Series</option>
                                            <option value="Maritime Series">Maritime Series</option>
                                            <option value="Interferometric Data Stack">Interferometric Data Stack</option>
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
                                <Button variant="success" id="requestbtn" onClick={this.addbtn} >ADD</Button>
                                <Button variant="danger" id="requestbtn" onClick={this.clearbtn}>Clear</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(Cosmo)