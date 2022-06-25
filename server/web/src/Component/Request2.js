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
import Cosmo from './Cosmo'
import Radar from './Radar'
import '../CSS/Request.css'
import { connect } from 'react-redux';


class Request2 extends Component{
    constructor(props){
        super(props)
        var d = new Date().toDateString().split(" ")
        this.state={
            showsat : 'cosmo' ,
            showComponent : 'true',
            satellite : "CSK1",
            type : "Master",
            insert_request : d[2]+" "+ d[1] +" "+ d[3],
            work_order_id : "CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-",
            order_id : "",
            pr_id : "",
            ar_counter : "",
            dtos_id : "",
            acq_date : "",
            start_time : "",
            stop_time : "",
            sensor_mode : "",
            beam_type : '',
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
            status : 'waiting',            
            remark : '',
            operator : this.props.user.name,
            customer : '',
            organization : '',
            project : '',
            qty : '',
            priority : '',
            package : '', 
            acq_id : '',         
            show : false,
            fileinput : null    
        }
            
    }

    render(){
        return(
            <div style={{width:'100%'}}>
                <div id="firstsectionRequest">                    
                </div>
                <div id="toolbar" >
                        <Button variant="primary" id="toolbutton" href="/workorder">WORK ORDER</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/request">NEW REQUESE</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/cart">CART</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/history">HISTORY</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/login">LOG OUT</Button>{' '}
                </div>               
                    <div>                 
                        <div id='formbg1' style={{flexDirection:"column",justifyContent:"center",display:"flex",alignItems:"center"}}>  
                            <div id="formbg2" style={{backgroundColor:"lightblue"}}> 
                            <div style={{margin:"10px"}}>
                                <Badge bg="primary" style={{fontSize:"32px"}}>Request</Badge> 
                            </div>
                            
                            <Form.Group id='formbg3'  >                      
                                <div id="divfordropdown">
                                    <Form.Label id='inputtext' >
                                    Satellite
                                    </Form.Label>
                                    <Col >
                                        <Form.Select id='inputcontroldropdown' onChange={(e)=>{
                                            if(e.target.value === 'CSK1'){
                                                this.setState({showsat:'cosmo'})                                    
                                                this.setState({satellite:'CSK1'})
                                                this.setState({work_order_id:"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"}) 

                                                this.setState({showComponent: true})
                                            }else if(e.target.value === 'CSK2'){
                                                this.setState({showsat:'cosmo'})
                                                this.setState({work_order_id:"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"}) 
                                         
                                                this.setState({satellite:'CSK2'})
                                                this.setState({showComponent: true})
                                            }else if(e.target.value === 'CSK3'){
                                                this.setState({showsat:'cosmo'})
                                                this.setState({work_order_id:"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"}) 
                                                
                                                this.setState({satellite:'CSK3'})
                                                this.setState({showComponent: true})
                                            }else if(e.target.value === 'CSK4'){
                                                this.setState({showsat:'cosmo'})                                              
                                                this.setState({satellite:'CSK4'})
                                                this.setState({work_order_id:"CSK-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"}) 
                                                this.setState({showComponent: true})
                                            }else{
                                                this.setState({showsat:'radar'})       
                                                this.setState({work_order_id:"RAD-"+(new Date().getFullYear() + 543).toString().substring(2,4)+"-"})                                         
                                                this.setState({satellite:'RADSat-2'})
                                                this.setState({showComponent: false})
                                            }
                                        }}>                                            
                                            <option value="CSK1">CSK1</option>
                                            <option value="CSK2">CSK2</option>
                                            <option value="CSK3">CSK3</option>
                                            <option value="CSK4">CSK4</option>
                                            <option value="RAD">Radarsat-2</option>
                                        </Form.Select>
                                    </Col>
                                    
                                </div>                            
                            </Form.Group>
                            </div>
                            <div>           
                                {this.state.showComponent && <div><Cosmo user={this.props.user} requestdata={this.state}/></div>}
                                {!this.state.showComponent && <div><Radar user={this.props.user} requestdata={this.state}/></div>}                                                                                                                                                                        
                            </div>
                            
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

export default connect(mapStateToProps,mapDispatchToProps)(Request2)