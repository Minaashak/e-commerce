import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext = createContext();

let headers ={
    token:localStorage.getItem("userToken")
};

function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:id
    },{
        headers
    }).then((res)=>res).catch((err)=>err);
};

function getCartIteam(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart `,{
        headers
    }).then((res)=>res).catch((err)=>err);
};
function deleteProductFromCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id} `,{
        headers
    }).then((res)=>res).catch((err)=>err);
};


function clearProductFromCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{
        headers
    }).then((res)=>res).catch((err)=>err);
};


function upDataProductQuantity(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count
    },{
        headers
    }).then((res)=>res).catch((err)=>err);
};


export default function CartContextProvider(props){

    const[numOfCartItem , setNumOfCartItem] = useState(null);
    const[cartId , setCartId] = useState(null);


    async function getCartCount(){
      let{data} =  await getCartIteam();
      setNumOfCartItem(data?.numOfCartItems);
      setCartId(data?.data._id);
    }


    function onLinePayment(shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress
        },{
            headers
        }).then((res)=>res).catch((err)=>err);
    };

    function cashPayment(shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
            shippingAddress
        },{
            headers
        }).then((res)=>res).catch((err)=>err);
    };

    useEffect(()=>{
        getCartCount();
    },[]);
 
    return <CartContext.Provider value={{addToCart , getCartIteam , deleteProductFromCart ,cashPayment , clearProductFromCart , upDataProductQuantity , onLinePayment , setNumOfCartItem , numOfCartItem }}>
        {props.children}
    </CartContext.Provider>
}
