import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    let navigate = useNavigate();
    let[loading , setLoading] = useState(true);


async function fogetFunction(values){

    setLoading(false);
    let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values);

    if(data.data.statusMsg === "success"){
        toast.success(data.data.message);
        setLoading(true);
        navigate("/resetcode");
    }

}


    let formik = useFormik({
        initialValues:{
            email:""
        },
        // validationSchema,
        onSubmit:(values)=>fogetFunction(values)
    })

return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
            </Helmet>

<div className="container min-height">
    <div className="row bg-main-color rounded w-75 m-auto  p-3 my-3">
        <h3 className='p-2'> Forget Password</h3>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group p-4">
                <label htmlFor='email' className="my-2"> Enter Your Email:</label>
                <input type="email" id='email' className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>

            {loading?<button type='submit' className='btn-desgin btn btn-color text-white d-block ms-auto' > submit </button> :<>
            <button className='btn-desgin btn-color d-block ms-auto text-white p-2'>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            </button>
            </> }

        </form>
    </div>
</div>
</>
)
}
