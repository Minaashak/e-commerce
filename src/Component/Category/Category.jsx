import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { PropagateLoader } from 'react-spinners';

export default function Category() {
  const[ categoeyItem , setCategoryItem ]= useState();
  const[loading , setLoading] = useState(true);


async function getCategoryItems(){

  setLoading(false);
  let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  setLoading(true);

  setCategoryItem(data);
}
  
useEffect(()=>{
  getCategoryItems()
},[])
  
  return (<>


            <Helmet>
                <meta charSet="utf-8" />
                <title>Category</title>
            </Helmet>
  

  {loading?<div className="container min-height">
    <div className="row g-4 my-3">
    {categoeyItem?.data.map((ele)=>  <div key={ele._id} className="col-md-4 btn">
        <div className="card">
          <div className="img">
            <img src={ele.image} className='w-100' height={400} alt={ele.name} />
          </div>
          <div className="title">
            <h3 className='title-prod-col p-3'>{ele.name}</h3>
          </div>
        </div>
      </div>)}
    </div>
  </div>:<>
    <div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
  </>}
  
  
  </>
  )
}
