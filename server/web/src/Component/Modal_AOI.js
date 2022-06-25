import React, { useState,useEffect } from 'react';
import '../CSS/cart.css'
import { Table,Button,Modal } from "react-bootstrap"
import { connect } from 'react-redux';
import  Axios  from "axios";
import { Icon } from '@iconify/react';
import { delete_cart_item,clear_cart } from "../action/Events";
import {
    MapContainer,
    TileLayer,
    Polygon,
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Modal_AOI =(props)=>{
    const redOptions = { color: 'red' }
    //var new_tl_n=null,new_br_e=null,new_tl_e=null,new_tr_n=null,new_tr_n=null,new_bl_n=null,new_bl_n=null,new_br_n=null,new_br_n=null,new_tr_e=null,new_bl_e=null;
    const [new_tl_n,setnew_tl_n] = useState(null);
    const [new_tl_e,setnew_tl_e] = useState(null);
    const [new_tr_n,setnew_tr_n] = useState(null);
    const [new_tr_e,setnew_tr_e] = useState(null);
    const [new_bl_n,setnew_bl_n] = useState(null);
    const [new_bl_e,setnew_bl_e] = useState(null);
    const [new_br_n,setnew_br_n] = useState(null);
    const [new_br_e,setnew_br_e] = useState(null);

    useEffect(() => {
        if(props.lat_log_aoi !== undefined){    
            console.log(props.lat_log_aoi);

            setnew_tl_n(props.lat_log_aoi.tl_n)
            setnew_tl_e(props.lat_log_aoi.tl_e)
            setnew_tr_n(props.lat_log_aoi.tr_n)
            setnew_tr_e(props.lat_log_aoi.tr_e)
            setnew_bl_n(props.lat_log_aoi.bl_n)
            setnew_bl_e(props.lat_log_aoi.bl_e)
            setnew_br_n(props.lat_log_aoi.br_n)
            setnew_br_e(props.lat_log_aoi.br_e)
        }
        else if(props.aoi.tl_n !== undefined){
            var new_tl_n = (parseInt(props.aoi.tl_n.slice(0, 2))+(parseInt(props.aoi.tl_n.slice(2, 4))/60)+(parseInt(props.aoi.tl_n.slice(4))/3600)).toFixed(3);
            var new_tl_e = (parseInt(props.aoi.tl_e.slice(0, 3))+(parseInt(props.aoi.tl_e.slice(3, 5))/60)+(parseInt(props.aoi.tl_e.slice(5))/3600)).toFixed(3);
            var new_tr_n = (parseInt(props.aoi.tr_n.slice(0, 2))+(parseInt(props.aoi.tr_n.slice(2, 4))/60)+(parseInt(props.aoi.tr_n.slice(4))/3600)).toFixed(3);
            var new_tr_e = (parseInt(props.aoi.tr_e.slice(0, 3))+(parseInt(props.aoi.tr_e.slice(3, 5))/60)+(parseInt(props.aoi.tr_e.slice(5))/3600)).toFixed(3);
            var new_bl_n = (parseInt(props.aoi.bl_n.slice(0, 2))+(parseInt(props.aoi.bl_n.slice(2, 4))/60)+(parseInt(props.aoi.bl_n.slice(4))/3600)).toFixed(3);
            var new_bl_e = (parseInt(props.aoi.bl_e.slice(0, 3))+(parseInt(props.aoi.bl_e.slice(3, 5))/60)+(parseInt(props.aoi.bl_e.slice(5))/3600)).toFixed(3);
            var new_br_n = (parseInt(props.aoi.br_n.slice(0, 2))+(parseInt(props.aoi.br_n.slice(2, 4))/60)+(parseInt(props.aoi.br_n.slice(4))/3600)).toFixed(3);
            var new_br_e = (parseInt(props.aoi.br_e.slice(0, 3))+(parseInt(props.aoi.br_e.slice(3, 5))/60)+(parseInt(props.aoi.br_e.slice(5))/3600)).toFixed(3);
            setnew_tl_n(new_tl_n)
            setnew_tl_e(new_tl_e)
            setnew_tr_n(new_tr_n)
            setnew_tr_e(new_tr_e)
            setnew_bl_n(new_bl_n)
            setnew_bl_e(new_bl_e)
            setnew_br_n(new_br_n)
            setnew_br_e(new_br_e)
        }
    });

    const Box=()=>{
        if(new_bl_e !== null){
            return(
                <Polygon positions={[
                    [new_tl_n,new_tl_e],
                    [new_bl_n,new_bl_e],
                    [new_br_n,new_br_e],
                    [new_tr_n,new_tr_e],
                    
                    
                    ]} pathOptions={redOptions}  />
            )
        }
    }
    const center=()=>{
        if(new_tl_n !== null){
            return([new_tl_n, new_tl_e])
        }
    }
      
    return(
        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>AOI</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapContainer
                        center={center()}
                        zoom={10}
                        
                        style={{ height: "50vh",width:'100%' }}
                        
                    >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Box />
                
                </MapContainer>

            </Modal.Body>
            
        </Modal>
    );
    
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

export default connect(mapStateToProps,mapDispatchToProps)(Modal_AOI);