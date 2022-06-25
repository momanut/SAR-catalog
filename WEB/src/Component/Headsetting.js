import { Component } from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { headsetting } from "../action/Events";
import {TableHead} from './TableHead'

import { connect } from 'react-redux';
class Headsetting extends Component{
    constructor(props){
        super(props)

        this.state = {
            show : false,          
            sat :this.props.head,
            tmp : []
            
        }   
    }
    // sat: {
            //     satellite : false,
            //     type : false,
            //     insert_request : false,
            //     work_order_id : false,
            //     order_id : false,
            //     pr_id : false,
            //     ar_counter : false,
            //     dtos_id : false,
            //     acq_date : false,
            //     start_time : false,
            //     stop_time : false,
            //     sensor_mode : false,
            //     level : false,
            //     format : false,
            //     direction : false,
            //     angle : false,
            //     polarization : false,
            //     aoi_tl_n : false,
            //     aoi_tl_e : false,
            //     aoi_tr_n : false,
            //     aoi_tr_e : false,
            //     aoi_br_n : false,
            //     aoi_br_e : false,
            //     aoi_bl_n : false,
            //     aoi_bl_e : false,
            //     area : false,
            //     waiting : false,
            //     description : false,
            //     remark : false,
            //     operator : false,
            //     qty : false,
            //     package : false,
            //     troble_ticket : false
            // }
    handlerClose =()=> {
        this.setState({show:false})
        this.state.sat = this.state.tmp
        //console.log(this.state.sat)
    }
    handleShow =()=>{
        this.setState({show:true})
        this.state.tmp = this.state.sat
    }
    handleSave=()=>{
        this.setState({show:false})
        this.props.setsat(this.state.sat)
    }
    searchSetting=(key)=>{              
       
        let updatedList = this.state.sat.map(item => 
        {
            if (item.head == key){
            return {...item, value: !item.value}; //gets everything that was already in item, and updates "done"
            }else{
               return item; // else return unmodified item  
            }
            
        });
        console.log(updatedList)
        this.setState({sat: updatedList});
        console.log(key)
    } 

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                        Header Setting
                </Button>
                <Modal show={this.state.show} onHide={this.handlerClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>HEADER SETTING</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.sat.map((x)=>{
                                if(x.head !== 'work_order_id' && x.head !== 'id'){
                                    return(
                                    
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label={x.head} 
                                            defaultChecked={x.value}
                                            
                                        onChange={()=>this.searchSetting(x.head)}                               
                                    />  
                                    )
                                }
                                

                            })
                        }
                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handlerClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave} href='/workorder'>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({ 
    head:state.Reducer.satHead,
});
const mapDispatchToProps = (dispatch) => ({
    setsat: (item) => dispatch(headsetting(item))
});
  
  export default connect(mapStateToProps,mapDispatchToProps)(Headsetting);