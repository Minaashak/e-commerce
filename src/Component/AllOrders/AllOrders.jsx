import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { PropagateLoader } from 'react-spinners';

export default function AllOrders() {


const[allOredres , setAllOrders]= useState();
const[loading , setIsLoading] = useState(true);


async function getAllOredrs(){
  setIsLoading(false);
  let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  setAllOrders(data);
  setIsLoading(true);
}

useEffect(()=>{
  getAllOredrs()
},[])

  return (<>
    {loading? <div className="container">
      <div className="row g-4 my-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
            </Helmet>
        {allOredres?.data.map((ele)=> <div key={ele.id} className="col-sm-12">
        <div className="card">
            <h5 className="card-header">Oreder Details</h5>
            <div className="card-body">
              <h5 className="card-title">Oreder Number : <span className='title-prod-col'>{ele.id}</span></h5>
              <p className="card-text">Payment Method Type:  <span className='title-prod-col' >{ele.paymentMethodType}</span> </p>
              <p className="card-text">Total Order Price : <span className='title-prod-col' > {ele.totalOrderPrice} </span> </p>
              <p className="card-text">Order Quantity :  <span className='title-prod-col' > {ele.cartItems.length} </span> </p>
              <p className="card-text">Shipping Address:</p>
              <ul>
                <li>City : <span className='title-prod-col' > {ele.shippingAddress?.city} </span> </li>
                <li> Phone : <span className='title-prod-col' > {ele.shippingAddress?.phone} </span> </li>
                <li> Address Details :  <span className='title-prod-col' > {ele.shippingAddress?.details} </span> </li>
              </ul>
              
            </div>
        </div>
        </div>)}
      </div>
    </div> : <>
      <div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
    </> }
    </>
  )
}
