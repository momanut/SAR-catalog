import { CART, HEADSETTING, LOGIN,DELETE_CART_ITEM,CLEAR_CART,ADD_CUSTOMER,DELETE_CUSTOMER_SELECT,CLEAR_CUSTOMER_SELECT, EDIT_ORDER } from "../action/Type";

const intialState = {
    user:{
        username:'default',
        email:'test@test.com',
        name:'test'
    },
    cart:[],
    editOrder: '',
    customer_select:[],
    satHead : [{head:"id",value:false},
                    {head:"work_order_id",value:true},
                    {head:"satellite", value:false},
                    {head:"type", value:false},
                    {head:"insert_request", value:false},
                    
                    {head:"order_id",value:false},
                    {head:"pr_id",value:false},
                    {head:"acq_id",value:false},
                    {head:"ar_counter",value:false},
                    {head:"dtos_id",value:false},
                    {head:"acq_date",value:false},
                    {head:"start_time",value:false},
                    {head:"stop_time",value:false},
                    {head:"sensor_mode", value:false},
                    {head:"beam_type", value:false},
                    {head:"level",value:false},
                    {head:"format",value:false},
                    {head:"direction",value:false},
                    {head:"angle",value:false},
                    {head:"polarization",value:false},
                    {head:"area",value:false},
                    {head:"status",value:false},                   
                    {head:"remark",value:false},
                    {head:"remark2",value:false},
                    {head:"customer",value:false},
                    {head:"organization",value:false},
                    {head:"project",value:false},
                    {head:"operator",value:false},
                    {head:"qty",value:false},
                    {head:"package",value:false},
               
                ]
}

const Reducer =(state = intialState,action)=>{
    
    switch(action.type){
        
        case LOGIN:       
            console.log(action.username)     
            return{
                ...state,user:{
                    username:action.username,        
                    name:action.name   
                }
            }
        case HEADSETTING:
            console.log("action : " + action.satHead)
          
            return{
                ...state,satHead:action.satHead
            }
        case CART:
            console.log(action.work_order);
            return{
                ...state,cart:[...state.cart,action.work_order.work_order_id]
            }
        case DELETE_CART_ITEM:
            
            return{
                ...state,cart:state.cart.filter((item)=>item !== action.item)
            }
        case CLEAR_CART:
            return{
                ...state,cart:[]
            }

        case ADD_CUSTOMER:
        
            return{
                ...state,customer_select:[...state.customer_select,{
                    id:action.item.id,
                    name:action.item.name,
                    email:action.item.email,
                    FTP:action.item.FTP,
                    username:action.item.username,
                    password:action.item.password
                }]
            }
        case DELETE_CUSTOMER_SELECT:
            
            return{
                ...state,customer_select:state.customer_select.filter((item)=>item.id !== action.id)
            }
        case CLEAR_CUSTOMER_SELECT:
            return{
                ...state,customer_select:[]
            }
        case EDIT_ORDER:
            return{
                ...state,editOrder:action.edit_id
            }
        
        default:
            return state

    }
}
export default Reducer;