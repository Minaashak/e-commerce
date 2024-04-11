import React from 'react'
import { useContext } from 'react';
import { tokenContext } from './../../Context/tokenContext';
import AllProducts from '../AllProdacts/AllProducts';
import HomeSlider from './../HomeSlider/HomeSlider';
import Responsive from './../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';

export default function Home() {

  let{token} = useContext(tokenContext)

  return (<>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>

    <HomeSlider/>
    <Responsive/>
    <AllProducts></AllProducts>
  </>
  )
}
