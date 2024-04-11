import axios from 'axios';
import React, { useContext, useState } from 'react';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { tokenContext } from '../../Context/tokenContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  let[isLoading , setIsLoading] = useState(false);
  let[apiMsg , setApiMsg] = useState("");
  let navigate = useNavigate();
  let{setToken} = useContext(tokenContext)
  
async function Login(values){
    setApiMsg();
    setIsLoading(true);
    let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin" , values).catch((err)=>{
      setApiMsg(err.response.data.message);
      setIsLoading(false);
    });
    console.log(data);
   if(data.message == "success"){
    setIsLoading(false);
    localStorage.setItem("userToken" , data.token);
    setToken(data.token)
    navigate('/home');
   }

  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , "Password Should be start with Capital letter and should have small letter and number").required("Password is required"),
    
  })

  let formik = useFormik({
    initialValues:{
      
      email:"",
      password:"",
      
    },
    validationSchema:validationSchema,
    onSubmit:(values)=> Login(values)

  })

  return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>

    <div className="container min-height">
      <div className="row bg-main-color rounded  p-3 my-3">
        <h1 className='my-3'>Login Now:</h1>
        { apiMsg ? <p className='alert alert-danger'>{apiMsg}</p> :<div className='d-none'></div> }
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>


          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className='form-control mb-3'  id="email" name="email" value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email? <p className='alert alert-danger'>{formik.errors.email}</p> : null }
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password:</label>
            <input type="password" className='form-control mb-3' id="pass" name="password" value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
            {/* {formik.errors.password && formik.touched.password? <p className='alert alert-danger' >{formik.errors.password}</p> : null} */}
          </div>

          

          
        

          {isLoading ? <button className='btn-desgin btn-color d-block ms-auto text-white'>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            </button> : 
            <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn-desgin btn-color p-2 text-white d-block ms-auto'>Login</button>}
          

        <Link className='my-3' to={"/forgetpassword"}>
        <button className='btn my-3 title-prod-col d-block ms-auto'> Forget Password? </button>
        </Link>
        </form>
      </div>
    </div>
    
    
    </>
  )
}
