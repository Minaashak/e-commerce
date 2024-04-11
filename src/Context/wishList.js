import axios from "axios";
import { createContext} from "react";



export let wishListContext = createContext();

let headers={
    token:localStorage.getItem("userToken")
};

function wishListAdd(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:id
    },{
        headers
    }
    )
};

function displayWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
};

function removeProductFromWishList(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{headers})
}

export default function WishListContextProvider(props){
    return <wishListContext.Provider value={{wishListAdd ,displayWishList ,removeProductFromWishList }}>
        {props.children} 
    </wishListContext.Provider>
}