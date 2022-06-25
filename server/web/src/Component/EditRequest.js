import { Component } from "react";
import Button from 'react-bootstrap/Button'

import '../CSS/Request.css'

import {Badge,Modal} from 'react-bootstrap'

import '../CSS/Request.css'
import { connect } from 'react-redux';
import  Axios  from "axios";

import EditCosmo from "./EditCosmo";
import EditRad from "./EditRad";

class EditRequest extends Component{
    constructor(props){
        super(props)
        
        this.state={
            data:[],
            aoi:[]
            
        }
            
    }
    componentDidMount=()=>{
        Axios.get('http://localhost:3001/geteditrequest/'+this.props.editReq).then((response)=>{
            
            this.setState({ data:  response.data[0]})
        })
        Axios.get('http://localhost:3001/geteditarea/'+this.props.editReq).then((response)=>{
            
            this.setState({ aoi:  response.data[0]})
        })
    }
    loadData=()=>{
        
    }
    showData=()=>{
        
        if(this.state.data != []){
            
            var d = new Date().toDateString().split(" ")
            if(this.state.data.satellite === 1 ||this.state.data.satellite === 2 ||this.state.data.satellite === 3 ||
                this.state.data.satellite === 4){
                return(
                    <div>
                        <EditCosmo editdata={this.state.data} aoi={this.state.aoi} insert_request ={d[2]+" "+ d[1] +" "+ d[3]}/>
                    </div>
                )
            }else{
                return(
                    <div>
                        <EditRad editdata={this.state.data} aoi={this.state.aoi} insert_request ={d[2]+" "+ d[1] +" "+ d[3]}/>
                    </div>
                )
            }
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
                                    <Badge bg="primary" style={{fontSize:"32px"}}>Edit Request</Badge> 
                                </div>
                            </div>
                            <div>
                                {this.showData()}
                            </div>
                            
                        </div>
                    </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({ 
    user:state.Reducer.user,
    editReq:state.Reducer.editOrder
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(EditRequest)