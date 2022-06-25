import { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import '../CSS/workorder.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {TableHead} from './TableHead'
import { Table,FormControl } from "react-bootstrap"
import Headsetting from './Headsetting'
import { connect } from 'react-redux';
import  Axios  from "axios";
import { Icon } from '@iconify/react';
import { addcart, edit_order } from "../action/Events";
import Modal_AOI from "./Modal_AOI";

class WorkOrder extends Component{
    constructor(props){
        super(props)

        this.state = {
            arrSat : this.props.sat,
            data : [],
            show_aoi:false,
            aoi:{},
            startDate:'',
            endDate:'',
            page:1,
            pageshow:1,
            searchoption:''
        }   

    }

   componentDidMount=()=>{
    this.sendingData()
   } 
    sendingData=()=>{
        var dataString = ''
        this.state.arrSat.forEach(element => {
            // console.log(element.head);
            if(element.value === true){
               dataString += ',' +element.head 
            }
          
        });
        console.log(dataString);
        Axios.get('http://localhost:3001/getdata/'+dataString).then((response)=>{
        
            console.log(response.data);
            this.setState({ data:  response.data})
        })
    }

    handleCloseAoi=()=>{
        this.setState({show_aoi:!this.state.show_aoi})
    }

    OpenAoi=(id)=>{
        Axios.get('http://localhost:3001/get_AOI/'+id).then((response)=>{
            this.setState({aoi:response.data[0]})
            this.handleCloseAoi()
        })   
    }

    get_searchTool_option=(option,page)=>{
        var dataString = ''
        this.state.arrSat.forEach(element => {
            // console.log(element.head);
            if(element.value === true){
               dataString += ',' +element.head 
            }
        });
        if(option !== this.state.searchoption){
            this.setState({searchoption:option})
            this.setState({page:1})
            this.setState({pageshow:1})
        }
        var startdate='-',enddate ='-'
        if(this.state.startDate !== ''){
            startdate = this.state.startDate.replaceAll('-','')
        }
        if(this.state.endDate !== ''){
            enddate = this.state.endDate.replaceAll('-','')
        }

        if(option!==''){
            Axios.get('http://localhost:3001/data_with_option/'+option+'/'+page+'/'+dataString+'/'+startdate+'/'+enddate,{
            }).then((response)=>{
                console.log(response.data)
                this.setState({ data:  response.data})
            })
        }else{
            Axios.get('http://localhost:3001/data_with_option/-'+'/'+page+'/'+dataString+'/'+startdate+'/'+enddate,{
            }).then((response)=>{
                console.log(response.data)
                this.setState({ data:  response.data})
            })
        }
    }


    add_page=()=>{
        this.setState({page:this.state.page+1})
        this.setState({pageshow:this.state.pageshow+1})
        this.get_searchTool_option(this.state.searchoption,parseInt(this.state.page)+1)
    }
    minus_page=()=>{
        if(this.state.page -1 >0){
            this.setState({page:this.state.page-1})
            this.setState({pageshow:this.state.pageshow-1})
            this.get_searchTool_option(this.state.searchoption,parseInt(this.state.page)-1)
        }
  
    }

    test=()=>{
        console.log(this.state.startDate);
        console.log(this.state.endDate);
    }

    render(){
        return(
            <div style={{width:"100%", height:"100vh"}}>
                <Modal_AOI show={this.state.show_aoi} handleClose={this.handleCloseAoi} aoi={this.state.aoi} shp={false}/>
                <div id="firstsectionWorkOrder">
                    <h6>Username : {this.props.user.username}</h6>
                </div>
                
                <div id="secondsectionWorkOrder">
                    <div id="toolbar">
                        <Button variant="primary" id="toolbutton" onClick={()=>{window.location.reload()}}>WORK ORDER</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/request">NEW REQUESE</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/cart">CART</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/history">HISTORY</Button>{' '}
                        <Button variant="primary" id="toolbutton" href="/login">LOG OUT</Button>{' '}
                    </div>
                    <div id="formdivision">
                        <Form.Floating id="formsection" style={{width:"15%"}}>
                            <Form.Control  type="date" placeholder="Normal text" style={{borderRadius:15}}
                                onChange={(e)=>this.setState({startDate:e.target.value})} value={this.state.startDate}
                            />
                            <label htmlFor="floatingInputCustom">START</label>
                        </Form.Floating>
                        <Form.Floating id="formsection" style={{width:"15%"}}>
                            <Form.Control  type="date" placeholder="Normal text" style={{borderRadius:15}}
                                onChange={(e)=>this.setState({endDate:e.target.value})} value={this.state.endDate}
                            />
                            <label htmlFor="floatingInputCustom">END</label>
                        </Form.Floating>
                        <FloatingLabel id="formsection" controlId="floatingTextarea" label="Search" >
                            <Form.Control as="textarea" placeholder="Search..." style={{minHeight:'60px', maxHeight: '60px', width:"100%"}} onChange={(e)=>this.setState({searchoption:e.target.value})} />
                        </FloatingLabel>
                        <Button id="formsection" variant="success" style={{width:"10%", justifyContent:'center'}} onClick={()=>{this.get_searchTool_option(this.state.searchoption,this.state.page)}}>Search</Button>{' '}
                        <Button id="formsection" variant="danger" style={{width:"10%", justifyContent:"center"}}>Reset</Button>{' '}
                    
                    </div>
                    <div id ="headsetting" style={{overflow:"auto"}}>
                        <Headsetting />                        
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',margin:'15px'}}>
                        <Button variant='dark' style={{borderRadius:'20px'}} onClick={this.minus_page}>{'<'}</Button>
                        <FormControl style={{width:'20%',marginLeft:'15px',marginRight:'15px',borderRadius:'20px',textAlign:'center'}}
                        value={this.state.pageshow} readOnly/>
                        <Button variant='dark' style={{borderRadius:'20px'}} onClick={this.add_page} >{'>'}</Button>
                </div>
                {/* <div id="thirdsectionWorkOrder"> */}
                    
                    <Table responsive striped bordered hover >
                        <thead >
                            <tr >
                            <th align="center" >
                                No.
                            </th>
                            <th align="center" >
                                del
                            </th>
                            <th align="center" >
                                CART
                            </th>
                            <th>
                                AOI
                            </th>
                           
                                {                                 
                                    this.state.arrSat.map((xx,index)=>{
                                        if(xx.value === true){
                                           
                                            return(
                                                <th align="center"  keys={index} > {xx.head} </th>
                                            )
                                        }
                                        
                                    })
                                }

                            </tr>
                            </thead>
                            <tbody>
                                {                                    
                                    this.state.data.map((x,index)=>{
                                        return(
                                            <tr  >
                                                <td>                                            
                                                    {index+1}
                                                </td>
                                                <td align="center">
                                                    <Icon icon="ri:delete-bin-2-fill" height="24"/>
                                                </td>
                                                <td align="center" >
                                                    <Icon icon="bxs:cart" height="24" onClick={()=>{
                                                        // console.log(x.work_order_id);
                                                        this.props.addcart(x)
                                                    }} />
                                                </td>
                                                <td align="center">
                                                <Icon icon="charm:map" height="24" onClick={()=>this.OpenAoi(x.work_order_id)} />
                                                </td>                                             
                                                {
                                                    Object.entries(x).map(([key,value])=>{
                                                        if(key === 'work_order_id'){
                                                            return(                                                
                                                                <td width="100px"  style={{color:"blue",textDecorationLine:"underline"}} >
                                                                    <a onClick={()=>{this.props.editOrder(value)}} href='/editrequest'>
                                                                        {value}
                                                                    </a>
                                                                </td>
                                                            ) 
                                                        }else{
                                                            return(
                                                
                                                            <td >
                                                                {value}
                                                            </td>
                                                            ) 
                                                        }                                                                                                                                                                      
                                                    })
                                                }                                                                                         
                                            </tr>
                                        )                                       
                                        
                                    })
                                }
                            </tbody>                        
                    </Table>
                {/* </div> */}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({ 
    user:state.Reducer.user,
    sat:state.Reducer.satHead,
});
const mapDispatchToProps = (dispatch) => ({
    addcart: (item) => dispatch(addcart(item)),
    editOrder : (item) =>dispatch(edit_order(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(WorkOrder);