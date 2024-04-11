import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet';

export default function ResetCode() {

    async function resetCodePass(values){
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values );
        console.log(res?.data);
    }

    let formik = useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:(values)=>resetCodePass(values)
    })


return (<>
    
    <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Code</title>
            </Helmet>

    <div className="container min-height">
        <div className="row bg-main-color my-4 p-4  rounded">
            <h3>reset your account password</h3>

            <form onSubmit={formik.handleSubmit} >
                <div className="form-group my-3">
            
                    <input type="text" placeholder='Code' className='form-control' name='resetCode' value={formik.values.resetCode} onChange={formik.handleChange} />
                </div>
                <button type='submit' className='btn-desgin text-white d-block ms-auto btn btn-color my-2'>Verify</button>
            </form>
        </div>
    </div>

</>
)
}
