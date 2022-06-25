import { Component } from "react";
import  Axios  from "axios";
import { Button } from "react-bootstrap";
class SettingArea extends Component{
    constructor(props){
        super(props)       
        this.state ={
            requesData:'',
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
    getdata=()=>{
        Axios.get('http://localhost:3001/getarea/').then((response)=>{
        
            console.log(response.data);
            this.setState({ requesData:  response.data})
        })
    }
    showAREA=()=>{
        console.log(this.state.requesData);
    }
    processingArea=()=>{
        var tmpsatID
        var count = 0
        var   aoi_tl_n 
        var   aoi_tl_e 
        var   aoi_tr_n 
        var   aoi_tr_e 
        var   aoi_bl_n 
        var   aoi_bl_e 
        var   aoi_br_n 
        var   aoi_br_e 
        try {
            for (let i = 0; i <= this.state.requesData.length; i+=4) {
                var element =  this.state.requesData
                    aoi_tl_n = element[i]['_lat']
                    aoi_tl_e = element[i]['_long']
                    aoi_tr_n = element[i+1]['_lat']
                    aoi_tr_e = element[i+1]['_long']
                    aoi_br_n = element[i+3]['_lat']
                    aoi_br_e = element[i+3]['_long']
                    aoi_bl_n = element[i+2]['_lat']
                    aoi_bl_e = element[i+2]['_long']
                // if(tmpsatID === undefined){
                //     tmpsatID = element['satdata_id']
                 
                //     aoi_tl_n = element[i]['_lat']
                //     aoi_tl_e = element[i]['_long']
            
                    
                // }else if(tmpsatID != element['satdata_id']){
                //     tmpsatID = element['satdata_id']
                //     console.log("change");
                    
                //     aoi_tl_n = element['_lat']
                //     aoi_tl_e = element['_long']
         
    
                // }else if(tmpsatID === element['satdata_id']){
                //     // console.log("same");
                //     if(count === 1){
                //         aoi_tr_n = element['_lat']
                //         aoi_tr_e = element['_long']
                //     }else if(count === 2){
                //         aoi_br_n =element['_lat']
                //         aoi_br_e = element['_long']
                        
                //     }else if(count === 3){
                //         aoi_bl_n = element['_lat']
                //         aoi_bl_e = element['_long']
                //     }
                
                // }            
                console.log( element[i]['id'],element[i]['satdata_id'],aoi_tl_n ,
                aoi_tl_e,
                aoi_tr_n ,
                aoi_tr_e ,
                aoi_bl_n ,
                aoi_bl_e ,
                aoi_br_n ,
                aoi_br_e );
             
                
                
            }
        } catch (error) {
            console.log(error);
        }

        

    }
    render(){
        return(
            <div style={{display:'flex',justifyContent:"space-between"}}>
                <Button onClick={this.getdata}>
                    gettingAREA
                </Button>
                <Button onClick={this.showAREA}>
                    show
                </Button>
                <Button onClick={this.processingArea} >
                    Processing
                </Button>
            </div>
        );
    }
}
export default SettingArea