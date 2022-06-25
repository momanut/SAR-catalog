import React ,{ useState,useEffect } from 'react';
import ReactFileReader from 'react-file-reader';
import { saveAs } from 'file-saver';
import XMLParser from "react-xml-parser";
import Modal_AOI from "./Modal_AOI";
import { Icon } from '@iconify/react';
import { Button } from 'react-bootstrap';
const ReadingSHP = (props)=> {

  const [show,setShow] = useState(null);
  const [tl_n,setnew_tl_n] = useState('');
  const [tl_e,setnew_tl_e] = useState('');
  const [tr_n,setnew_tr_n] = useState('');
  const [tr_e,setnew_tr_e] = useState('');
  const [bl_n,setnew_bl_n] = useState('');
  const [bl_e,setnew_bl_e] = useState('');
  const [br_n,setnew_br_n] = useState('');
  const [br_e,setnew_br_e] = useState('');

  const onChangeFile = (e) => {
    "use strict";
    e.preventDefault();
    const zip = require('jszip')();
    var JSZip = require("jszip");
    let files = e.target.files;
    for (let file = 0; file < e.target.files.length; file++) {
      // Zip file with the file name.
      zip.file(files[file].name, files[file]);
      console.log(files[file].name);
      console.log("e.target.files[0] : ",e.target.files[0]);
      JSZip.loadAsync(files[file])                                   // 1) read the Blob
      .then(function(zip) {
        zip.forEach(function (relativePath, zipEntry) {  // 2) print entries       
          if(relativePath.endsWith(".shp")){
            console.log("this is .shp : ", relativePath);
            console.log("this is .shp : ", zipEntry);
          }
          else if(relativePath.endsWith(".dbf")){
            console.log("this is .dbf : ", relativePath);
            console.log("this is .dbf : ", zipEntry);
            
          }
        
      });
      }, function (e) {
         console.log(e)
      });
    }

        
  }
  const showaoi=()=>{
    var aoi={tl_n,tl_e,tr_n,tr_e,bl_n,bl_e,br_n,br_e}

    console.log("hear");
    console.log(aoi);
    handleCloseAoi()    
    
    
  } 

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const name = e.target.files[0].name
    var shapefile = require("shapefile");
    console.log("E : ",e.target.files[0]);
    reader.onload = (e) => {
     
      const text = e.target.result;
      console.log("text : ", text); 
      
      // if(name.endsWith('.dbf')){
      //   console.log(shapefile.openDbf(text).then(result=>{
      //     console.log(result.read().then(r=>{
      //       console.log("DBF VALUE :",r.value);
      //     }));
      //   }))
      // }
      if(name.endsWith('.dbf')){
        shapefile.openDbf(text).then(result=>{
          console.log(result.bbox)
          result.read().then(r=>{
            console.log(r.value);
          })
        })
      }
      // else if(name.endsWith('.shp')){
      //   console.log(shapefile.openShp(text).then(result=>{
      //     console.log(result.read().then(r=>{
      //       console.log(r);
      //     }));
      //   }))
      // }
      else if(name.endsWith('.shp')){   
          var tmp 
          var lst = {}
          shapefile.openShp(text).then(result=>{     
          console.log("Result : ", result);  
          console.log(result.bbox);
          var BBOX = result.bbox
          console.log(BBOX);
          result.read().then(r=>{
            console.log("R: ",r.value.coordinates) 
            tmp = r.value.coordinates[0]

            tmp.forEach(element => {
              console.log(element);

              if(BBOX[0]== element[0]){                
                lst.tl_n = element[1]
                lst.tl_e = element[0]
              }else if(BBOX[1]==element[1]){
                
                lst.tr_n = element[1]
                lst.tr_e = element[0]
              }else if(BBOX[2]==element[0]){

                lst.bl_n = element[1]
                lst.bl_e = element[0]
              
              }else if(BBOX[3]==element[1]){
                lst.br_n = element[1]
                lst.br_e = element[0]
                
              }
              setnew_tl_n(lst.tl_n )
              setnew_tl_e(lst.tl_e )
              setnew_tr_n(lst.tr_n)
              setnew_tr_e(lst.tr_e)
              setnew_bl_n(lst.br_n)
              setnew_bl_e(lst.br_e)
              setnew_br_n(lst.bl_n )
              setnew_br_e(lst.bl_e)
              
            
            });
            props.getData(lst.tl_n,lst.tl_e,lst.tr_n,lst.tr_e,lst.bl_n,lst.bl_e,lst.br_n,lst.br_e)
          })
                   
        
        
        })
          
        
      }
    };
    reader.readAsArrayBuffer(e.target.files[0]);   
    
  }  
  const handleCloseAoi=()=>{
    setShow(!show)
  }

  return (
    <div>      
      <input multiple type="file" name="file" 
      onChange={showFile}></input>
      <Button onClick={showaoi} >
        SHOW ON MAP
      </Button>
     
      {/* const [tl_n,setnew_tl_n] = useState('');
  const [tl_e,setnew_tl_e] = useState('');
  const [tr_n,setnew_tr_n] = useState('');
  const [tr_e,setnew_tr_e] = useState('');
  const [bl_n,setnew_bl_n] = useState('');
  const [bl_e,setnew_bl_e] = useState('');
  const [br_n,setnew_br_n] = useState('');
  const [br_e,setnew_br_e] = useState(''); */}
      <Modal_AOI show={show} aoi={undefined} handleClose={handleCloseAoi} lat_log_aoi={{tl_n,tl_e,tr_n,tr_e,bl_n,bl_e,br_n,br_e}} shp = {true}/>
    
    </div>

  );

}
export default ReadingSHP