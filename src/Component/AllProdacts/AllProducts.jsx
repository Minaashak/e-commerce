import axios from 'axios';
import React, { useContext, useState } from 'react'
import { PropagateLoader } from 'react-spinners';

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from './../../Context/wishList';


export default function AllProducts() {

    const styleIcon={
        fontSize: "29px"
    }
    
    let {addToCart,setNumOfCartItem} = useContext(CartContext);
    const [addToCartIteam , setAddToCartItem] = useState(true);
    let{wishListAdd} = useContext(wishListContext);
    const [wishListId , setWishListId] = useState();
    const[search , setSearch] = useState('');

    // !--- Wish List API Function
    async function wishList(id){
        let res =  await wishListAdd(id);

        setWishListId(res.data.data);
        if(res.data.status === "success"){
            toast.success(res.data.message);
        }
        
    }

    function getAllProducts(){
        return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
    }

    let {data , isLoading} = useQuery("allProducts" , getAllProducts);

async function addCartItem(id){
    setAddToCartItem(false);
    let addCart =await addToCart(id);
    if(addCart.data.status === "success"){
        toast.success(addCart.data.message);
        setNumOfCartItem(addCart.data.numOfCartItems);
    };
    setAddToCartItem(true);
};



return (<>


<div className="container min-height my-3">
    {isLoading ? <>
        <div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
    </> : <>
    <div className="row m-3 g-4">

        <div className="input-group my-3">
            <input type="text" className='form-control' placeholder='Product Search....' onChange={(e)=>setSearch(e.target.value)}  />
        </div>

        {data?.data?.data?.filter((ele)=>{
            return search.toLowerCase()==='' ? ele : ele?.title.toLowerCase().includes(search);
        }).map((ele)=> 
        <div className="col-md-6 col-lg-4 col-xl-3" key={ele.id}>
            <div className="prod px-3 py-2">
                <Link to={"/productdetails/" + ele.id}>
                <img className='w-100' src={ele.imageCover} alt={ele.title} />
                    <p className='title-prod-col'>{ele.category.name}</p>
                    <h3 className='h5'> {ele.title.split(" ").splice(0,2).join(" ")} </h3>
                    <div className='d-flex justify-content-between'>
                        <p> {ele.price} EGP</p>
                        <p> 
                        <i className='fa-solid fa-star star'></i>
                        {ele.ratingsAverage}
                        </p>
                    </div>
                </Link>
                    {addToCartIteam ? <>
                        <div className="btns d-flex justify-content-between">
                        <button onClick={()=> addCartItem(ele.id)} className='w-75 text-white btn-desgin  btn-color'>Add to Cart</button> 
                            <button onClick={()=> wishList(ele.id)}  className='btn '><i  className="fa-solid  wishListbtn fa-heart "></i></button> 
                        
                        </div>
                    </> :<>
                    <div className="btns d-flex justify-content-between">
                    <button disabled className='disabled w-75 text-white btn-desgin '>Add to Cart</button>
                    <button className='btn '><i className="fa-solid fa-heart"></i></button> 
                    </div>
                    </>}
                    
                </div>
        </div>
        )}
        
    </div>
    </>}

    
</div>


    </>
    )
}
