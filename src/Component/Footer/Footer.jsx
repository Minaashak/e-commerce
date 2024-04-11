import React from 'react'

export default function Footer() {




  return (<>
    <footer className='p-4 bg-main-color '>
    <h2>Get the FreshCart App</h2>
    <p>We will Send you a Link , Open it on Your Phone to download the app.</p>
    <form className='d-md-flex'>
      <input type="email" className='form-control w-75 mx-3 ' placeholder='Email'/>
      <button type='submit' className='btn-desgin btn btn-color text-white mx-3 my-2'> Share App Link</button>
    </form>
<hr />



    </footer>
    </>
  )
}
