import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { ClipLoader, PropagateLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';



export default function ProductDetails() {

  const [details , setDetails] = useState([]);
  const[loading , setIsLoading] = useState(true);
  let prodId = useParams();
  let {addToCart,setNumOfCartItem} = useContext(CartContext);
  const[addToCartIteam , setAddToCartItem] = useState(true);
    

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

async function getProductDetails(id){
  let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);

  setDetails(data.data);
  setIsLoading(false);
}

useEffect(()=>{
  getProductDetails(prodId.id)
},[]);

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

    <div className={`container min-height`}>
      {loading? <>
        <div className="load">
            <PropagateLoader color="#08ac0a"/>
        </div>
    </> : <div className="row align-items-center my-4 px-4 py-4 g-4">
        <div className="col-md-4">
       <div className="slider p-3">
       <Slider {...settings}>
        {details.images.map((ele , index)=> <img src={ele} key={index} alt=''/>)}
        </Slider>
       </div>
        </div>

        <Helmet>
                <meta charSet="utf-8" />
                <title> {details?.title} </title>
            </Helmet>

          <div className="col-md-8">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p className='title-prod-col'>{details.brand?.name}</p>
            <p className='title-prod-col'>{details.category?.name}</p>
            <div className="d-flex justify-content-between">
              <h4>{details.price} EGP</h4>
              <p><i className='fa-solid fa-star star'></i> {details.ratingsAverage} </p>
            </div>
            {addToCartIteam?<button onClick={()=>addCartItem(details.id)} className='w-100 text-white btn-color btn btn-desgin'>Add to Cart</button>:<button className='w-100 text-white btn-desgin btn-color'><ClipLoader  size={19} color="#fff7f7" /></button>}
          </div>
      </div>}
    </div>
  
  </>
  )
}
