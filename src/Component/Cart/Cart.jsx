import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { ClipLoader, PropagateLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

    let{getCartIteam,setNumOfCartItem , deleteProductFromCart , clearProductFromCart ,upDataProductQuantity  } = useContext(CartContext);
    const[cartData , setCartData] = useState();
    const[cartCount , setCartCount] = useState();
    const[loading , setIsLoading] = useState(true);
    

    async function getCart(){
      setIsLoading(false);
      let{data} = await getCartIteam();
      setIsLoading(true);
      setCartCount(data?.data?.products.length);
      setCartData(data);
    };
    
    async function deleteCartItem(id){
      setIsLoading(false);
      let {data} = await deleteProductFromCart(id);
      setCartData(data);
      setNumOfCartItem(data?.numOfCartItems);
      setIsLoading(true);
      setCartCount(data?.data?.products.length);
      
    };


    async function clearCart(){
      let{data}= await clearProductFromCart();
      setCartData(data);
      setNumOfCartItem(data?.numOfCartItems);
      setCartCount(data?.data?.products.length);

    };

    async function upDataCount(id,count){
      setIsLoading(false);
      let {data} = await upDataProductQuantity(id , count);
      setCartData(data);
      setIsLoading(true);
    }

    useEffect(()=>{
      getCart()
    },[])

  return (<>


<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
  
  { cartCount === undefined ? <>
  
  <div className="container min-height">
    <div className="empty bg-main-color p-4 my-4 ">
    <h1> Your Cart is Empty: </h1>
    </div>
  </div>
  </> : <>
  
  {loading? <div className="container  min-height   my-4" >
        <div className="row rounded bg-main-color p-4">
          <div className="top d-md-flex justify-content-between">
          <h2 className=' p-2'>Shop Cart:</h2>
      <button onClick={()=>clearCart()} className='btn-desgin bg-danger text-center my-2 p-2 text-white d-block d-md-flex align-self-center '> Clear All Cart </button>
          </div>
      <div className="d-md-flex justify-content-between  ">
        <div className="price">
        <h4 className='h5'>Total Cart Price: <span className=' title-prod-col'> {cartData?.data?.totalCartPrice}</span> EGP</h4>
        </div>
        <div className="item">
        <h4 className='h5'>Total Cart item: <span className=' title-prod-col'> {cartData?.numOfCartItems } </span></h4>
        </div>
      </div>


      {/* {numOfCartItem === 0 ? <h1> your Cart is Empty </h1> :  null } */}

      {cartData?.data?.products.map((ele)=><div key={ele.product.id} className="card mb-3 border-bottom border-0 bg-main-color">
  <div className="row g-0 align-items-center">
    <div className=" col-md-1 px-2">
      <img src={ele.product.imageCover} className="w-100 my-2"  alt={ele.title}/>
    </div>
    <div className="col-sm-8 col-md-10 my-3">
        <div className="d-md-flex justify-content-between">
          
          <div className="left-side ">
            <h5 className='h6 title-prod-col'>{ele.product.title}</h5>
            <p>price: <span className='title-prod-col'>{ele.price}</span> EGP</p>
          </div>
          <div className="rigth-side">
            <div className="d-flex d-md-block justify-content-between">
            <button onClick={()=>deleteCartItem(ele.product._id)} className='p-0 btn text-danger border-0'> <i className='fa fa-trash-can'></i> Remove </button> 
            <div className="counter my-3">
            <button onClick={()=>upDataCount(ele.product._id , ele.count - 1 )} className='rounded mb-1'>-</button>
            <span className=' title-prod-col mx-2'>{ele.count}</span>
            <button onClick={()=>upDataCount(ele.product._id , ele.count + 1 )} className='rounded me-3'>+</button>
            </div>
            </div>
          </div>
          
        </div>
    </div>
    
  </div>
   
</div>)}
<div className="button d-block  d-md-flex justify-content-between my-3 ">
     
      <Link className='btn-desgin text-white p-2 d-block btn-color d-md-flex my-2  text-center' to={"/chickout"} >Online Bayment</Link>
      <Link className='btn-desgin text-white p-2 d-block d-md-flex btn-color my-2 text-center' to={"/cashpayment"} >Cash on Delivery</Link>
      </div> 

      
    </div>
      
    </div>:<div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>}
  </>}
  
  </>
  )
}
