import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { wishListContext } from '../../Context/wishList';
import { Helmet } from 'react-helmet';

export default function Products() {

  let {addToCart,setNumOfCartItem} = useContext(CartContext);
  const [wishListId , setWishListId] = useState();
  let{wishListAdd} = useContext(wishListContext);
  const[search , setSearch] = useState('');


  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };

  async function addCartItem(id){

    let addCart =await addToCart(id);
    if(addCart.data.status === "success"){
        toast.success(addCart.data.message);
        setNumOfCartItem(addCart.data.numOfCartItems);
    };

};
  

  let{data , isLoading} = useQuery('products' , getProducts);

  
   // !--- Wish List API Function
  async function wishList(id){
    let res =  await wishListAdd(id);
    setWishListId(res.data.data);
    if(res.data.status === "success"){
        toast.success(res.data.message)
    }
    
}

  return (<>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Product</title>
            </Helmet>

    {isLoading?<>
      <div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
    </>  :<div className="container">
      <div className="row g-4 my-4 min-height">
      <div className="input-group my-3">
            <input type="text" className='form-control' placeholder='Product Search....' onChange={(e)=>setSearch(e.target.value)}  />
        </div>
        {data?.data.data.filter((ele)=>{
            return search.toLowerCase()==='' ? ele : ele?.title.toLowerCase().includes(search);
        }).map((ele)=><div key={ele._id} className="col-md-6 col-lg-4 col-xl-3" >
              <div className="prod px-3 py-2">
                  <Link to={"/productdetails/" +ele._id }>
                  <img className='w-100' src={ele.imageCover} alt={"`"} />
                      <p className='title-prod-col'>{ele.title.split(" ").splice(0,2).join(" ")}</p>
                      <h3 className='h5'> {ele.title.split(" ").splice(0,2).join(" ")} </h3>
                      <div className='d-flex justify-content-between'>
                          <p> {ele.price} EGP</p>
                          <p> 
                          <i className='fa-solid fa-star star'></i>
                          {ele.ratingsAverage}
                          </p>
                      </div>
                  </Link>
                    <div className="d-flex justify-content-between">
                      <button onClick={()=>addCartItem(ele._id)} className='w-75 text-white btn-desgin btn-color'>Add to Cart</button>
                      <button  onClick={()=> wishList(ele.id) } className='btn'>
                        <i className="fa-regular fa-heart"></i>
                        </button> 
                    </div>
                  </div>
        </div>)}
      </div>
    </div>}
    
    </>
  )
}
