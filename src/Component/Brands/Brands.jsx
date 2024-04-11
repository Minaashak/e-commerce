import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { PropagateLoader } from 'react-spinners';

export default function Brands() {
  
  const[bradItems , setBrandItems]= useState();
  const[loading , setLoading] =useState(true);



  async function getAllBrands(){
    setLoading(false);
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setLoading(true);
    setBrandItems(data);

  }


  useEffect(()=>{
    getAllBrands()
  },[])
  
  
  
  return (<>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>

  
    {loading?<>
      <div className="container min-height">
      <div className="row g-4 my-4">
        {bradItems?.data.map((ele)=><div className="col-md-3">
          <div className="card">
          <div className="img">
            <img src={ele.image} className='w-100' alt={ele.name} />
          </div>
          <div className="title title-prod-col">
            <h4 className='p-3'>{ele.name}</h4>
          </div>
          </div>
        </div> )}
      </div>
    </div>
    </> : <>
    <div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
    </> }
  
  </>
  )
}
