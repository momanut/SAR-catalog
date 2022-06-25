
import { CART, HEADSETTING, LOGIN,DELETE_CART_ITEM,CLEAR_CART,ADD_CUSTOMER,DELETE_CUSTOMER_SELECT,CLEAR_CUSTOMER_SELECT, EDIT_ORDER } from "./Type";


export const login=(item)=>(
    {
        
        type:LOGIN,
        username:item.username,
        name:item.name
    }
)
export const headsetting=(item)=>(
    {
        type:HEADSETTING,
        satHead:item
    }
)

export const addcart=(item)=>(
    {
        type:CART,
        work_order:item
        
    }
)

export const delete_cart_item=(item)=>(
    {
        type:DELETE_CART_ITEM,
        item:item
        
    }
)
export const clear_cart=()=>(
    {
        type:CLEAR_CART
    }
)
export const add_customer_select=(item)=>(
    {
        type:ADD_CUSTOMER,
        item:item
        
    }
)
export const delete_customer_select=(id)=>(
    {
        type:DELETE_CUSTOMER_SELECT,
        id:id
        
    }
)
export const clear_customer_select=()=>(
    {
        type:CLEAR_CUSTOMER_SELECT
    }
)
export const edit_order=(work_order_id)=>(
    {
        type:EDIT_ORDER,
        edit_id: work_order_id
    }
)
