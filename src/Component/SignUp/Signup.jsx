import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';




export default function Signup() {

  let[isLoading , setIsLoading] = useState(false);
  let[apiMsg , setApiMsg] = useState("");
  let navigate = useNavigate();
  
async function submite(values){
    setApiMsg();
    setIsLoading(true);
    let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup" , values).catch((err)=>{
    
      setApiMsg(err.response.data.message);
      setIsLoading(false);
    });
    
   if(data.message == "success"){
    setIsLoading(false);
    navigate('/login');
   }

  }

  let validationSchema = Yup.object({
    name: Yup.string().min(3 , "Min Length is 3").max(15 , "Max length is 15").required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , "Password Should be start with Capital letter and should have small letter and number").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")] , "Password and rePassword not matchs").required("RePassword is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , "Phone is inValid").required("Phone is required")
  })

  let formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=> submite(values)
  })

  return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Sing Up</title>
            </Helmet>

    <div className="container min-height">
      <div className="row bg-main-color rounded  p-3 my-3">
        <h1 className='my-3'>SignUp:</h1>
        { apiMsg ? <p className='alert alert-danger'>{apiMsg}</p> :<div className='d-none'></div> }
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" className='form-control mb-3'  id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.name && formik.touched.name? <p className='alert alert-danger'>{formik.errors.name}</p> : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className='form-control mb-3'  id="email" name="email" value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email? <p className='alert alert-danger'>{formik.errors.email}</p> : null }
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password:</label>
            <input type="password" className='form-control mb-3' id="pass" name="password" value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password? <p className='alert alert-danger' >{formik.errors.password}</p> : null}
          </div>

          <div className="form-group">
            <label htmlFor="repass">Repassword:</label>
            <input type="password" className='form-control mb-3'  id="repass" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rePassword && formik.touched.rePassword? <p className='alert alert-danger'>{formik.errors.rePassword}</p>: null}
          </div>

          
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" className='form-control mb-3' id="phone"  name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.phone && formik.touched.phone? <p className='alert alert-danger'>{formik.errors.phone}</p> : null}
          </div>


          {isLoading ? <button className='btn-desgin btn-color d-block ms-auto text-white'>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            </button> : 
            <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn-desgin btn-color text-white d-block p-2 ms-auto'>Register</button>}
          

        </form>
      </div>
    </div>
    
    
    </>
  )
}
