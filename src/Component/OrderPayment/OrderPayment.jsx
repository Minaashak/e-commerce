import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function OrderPayment() {

let[isLoading , setIsLoading] = useState(false);

let{onLinePayment} = useContext(CartContext);

let navigate =useNavigate();


    let formik = useFormik({
        initialValues:{
            "details": "",
            "phone": "",
            "city": ""
        },
        onSubmit:payment
    });


    async function payment(values){
        setIsLoading(true);
        let {data} = await onLinePayment(values);
        setIsLoading(false);
        window.location.href = data?.session.url;
        navigate("/allorders");
    }
return (<>


<Helmet>
                <meta charSet="utf-8" />
                <title>Payment</title>
            </Helmet>

    <div className="container min-height">
        <div className="row bg-main-color p-4 my-5 rounded">
            <h2 className='h4 my-3'>Shipping Address Details:</h2>
            <form onSubmit={formik.handleSubmit} >

                <div className="form-group mb-3">
                    <label htmlFor="details">Address Details:</label>
                    <input type="text" id='details' className='form-control' name='details' value={formik.values.details} onChange={formik.handleChange} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="phone"> Phone: </label>
                    <input type="tel" id='phone' className='form-control' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="city">City:</label>
                    <input type="text" id='city' className='form-control' name='city' value={formik.values.city} onChange={formik.handleChange} />
                </div>
                {isLoading ? <button className='btn-desgin btn btn-color d-block ms-auto text-white'>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            </button>:<button type='submit' className='btn-desgin btn btn-color text-white d-block ms-auto'>Buy Now</button>}
            </form>
        </div>
    </div>
    
    </>
  )
}
