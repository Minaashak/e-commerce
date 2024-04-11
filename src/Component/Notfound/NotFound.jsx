// !---Image-Error
import { Helmet } from "react-helmet";
import err from "./../../Assits/image/error.svg";
import ErrStyle from "./NotFound.module.css"
import React from 'react'

export default function NotFound() {
  return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Not Found</title>
            </Helmet>
  
  <img className={`${ErrStyle.imgError}`} src={err} alt="Page-Not-Found" />
  
  </>
  )
}
