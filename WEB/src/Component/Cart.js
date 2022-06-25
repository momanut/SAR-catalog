import { Component } from "react";
import '../CSS/cart.css'
import { Table,Button,Dropdown,DropdownButton } from "react-bootstrap"
import { connect } from 'react-redux';
import  Axios  from "axios";
import { Icon } from '@iconify/react';
import { delete_cart_item,clear_cart } from "../action/Events";
import Modal_AOI from "./Modal_AOI";
class Cart extends Component{
    constructor(props){
        super(props)

        this.state = {
            arrofHead : ["Work Order","OrderID","PRID",
                        "ACQ Date","Start Time","Stop Time"
                        ],
            cart:[],
            show_aoi:false,
            aoi:{}
        }   
        
    }

    handleCloseAoi=()=>{
        this.setState({show_aoi:!this.state.show_aoi})
    }

    OpenAoi=(id)=>{
        Axios.get('http://localhost:3001/get_AOI/'+id).then((response)=>{
            this.setState({aoi:response.data[0]})
        })
        this.handleCloseAoi()
        
    }

    componentDidMount(){
        if(this.props.cart.length !==0){
            Axios.get('http://localhost:3001/getItemCart/'+this.props.cart).then((response)=>{
                console.log(response.data);
                this.setState({cart:response.data})
            })
        }
    }

    checkOut=()=>{
        var d = new Date();
        var hour = d.getHours(),minite = d.getMinutes(),second = d.getSeconds(),month = d.getMonth()+1,date = d.getDate();
        

        if(d.getMonth()+1 < 10){
        month = '0'+(d.getMonth()+1)
        }if(d.getDate() < 10){
        date  = '0'+ d.getDate()
        }if(d.getHours() < 10){
        hour  = '0'+d.getHours()
        }if(d.getMinutes() < 10){
        minite  = '0'+d.getMinutes()
        }if(d.getSeconds() < 10){
        second = '0'+d.getHours()
        }
        var History_Date= date+'-'+month+'-'+d.getFullYear()
        var History_Time= hour+':'+minite+':'+second
        this.state.cart.forEach(item=>{
            Axios.post('http://localhost:3001/addHistory/',{
                date_order : History_Date,
                time_order : History_Time,
                work_order_id : item.work_order_id,
                type : item.type,
                price : 10,
      
            })
        })
        this.props.clear_cart();
    }

    render(){
        return(
            <div style={{width:"100%", height:"100vh"}}>
                <Modal_AOI show={this.state.show_aoi} handleClose={this.handleCloseAoi} aoi={this.state.aoi} />
                <div id="firstsectionCart">
                   
                </div>
                <div id='secondsectionCart'>
                    <div id="toolbar">
                        <Button variant="primary" id="toolbutton" href="/workorder">WORK ORDER</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/request">NEW REQUESE</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/cart">CART</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/history">HISTORY</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/login">LOG OUT</Button>{' '}
                    </div>
                    <div style={{display:"flex",justifyContent:'center',alignContent:"center"}}>
                        <h1 style={{display:"flex",alignSelf:"center",fontSize:"72px",marginTop:"0.5%",color:"steelblue"}}>
                            CART
                        </h1>
                    </div>
                    <div style={{display:"flex",width:"100%",alignItems:"flex-end",justifyContent:"flex-end",marginBottom:"1%"}}>
                        <Button id="formsection" variant="success" style={{width:"20%", justifyContent:'center'}} onClick={()=>{this.checkOut()}} href='/workorder'>Check Out</Button>{' '}
                        <Button id="formsection" variant="danger" style={{width:"20%", justifyContent:"center"}}
                        onClick={()=>{this.props.clear_cart();
                            this.setState({cart:[]})}}
                        >Clear</Button>{' '}
                    </div>
                </div>
                <div id='thirdsectionCart'>
                    <Table  striped bordered hover style={{}}>
                        <thead>
                            <tr>
                                <th align="center">
                                    No.
                                </th>
                                <th align="center">
                                    WorkOrder
                                </th >
                                
                                <th align="center">
                                    ACQ Date
                                </th>
                                <th align="center">
                                    Start Time
                                </th>
                                <th align="center">
                                    Stop Time
                                </th>
                                <th align="center">
                                    Mode
                                </th>
                                <th align="center">
                                    Priority
                                </th>
                                
                                <th align="center">
                                    AOI
                                </th>
                                <th align="center">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cart.map((item,index)=>{
                                    return(
                                        <tr>
                                            <td align="center">                                            
                                                {index}
                                            </td>
                                            <td align="center">                                            
                                                {item.work_order_id}
                                            </td>
                                            <td align="center">                                            
                                                {item.acq_date}
                                            </td>
                                            <td align="center">                                            
                                                {item.start_time}
                                            </td>
                                            <td align="center">                                            
                                                {item.stop_time}
                                            </td>
                                            <td align="center">                                            
                                                {item.sensor_mode}
                                            </td>
                                            <td align="center">                                            
                                                {item.priority}
                                            </td>
                                            <td align="center" >
                                                <Icon icon="charm:map" height="24" onClick={()=>this.OpenAoi(item.work_order_id)} />
                                            </td>
                                            <td align="center" onClick={()=>{
                                                 this.setState({cart: this.state.cart.filter(function(in_cart) { 
                                                    return in_cart.work_order_id !== item.work_order_id
                                                })});
                                                this.props.delete_cart_item(item.work_order_id)
                                            }} >
                                                <Icon icon="ri:delete-bin-2-fill" height="24"  />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({ 
    user:state.Reducer.user,
    sat:state.Reducer.satHead,
    cart:state.Reducer.cart,
});
const mapDispatchToProps = (dispatch) => ({
    //addcart: (item) => dispatch(addcart(item))
    delete_cart_item: (item) => dispatch(delete_cart_item(item)),
    clear_cart: () => dispatch(clear_cart()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Cart);