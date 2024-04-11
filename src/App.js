import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout/Layout';
import Cart from './Component/Cart/Cart';
import Home from './Component/Home/Home';
import Brands from './Component/Brands/Brands';
import Category from './Component/Category/Category';
import Login from './Component/Login/Login';
import Products from './Component/Products/Products';
import Signup from './Component/SignUp/Signup';
import NotFound from './Component/Notfound/NotFound';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import OrderPayment from './Component/OrderPayment/OrderPayment';
import AllOrders from './Component/AllOrders/AllOrders';
import WishList from './Component/wishList/WishList';
import ForgetPassword from './Component/forgetPassword/ForgetPassword';
import ResetCode from './Component/ResetCode/ResetCode';
import CashPayment from './Component/CashPaymenr/CashPaymenr';








function App() {
  let routers = createHashRouter([
    {path:"" , element: <Layout/>, children:[
      {index:true , element: <ProtectedRoutes> <Home/> </ProtectedRoutes> },
      {path:"home" , element:<ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path:"brands" , element: <ProtectedRoutes>  <Brands/> </ProtectedRoutes>},
      {path:"cart" , element: <ProtectedRoutes> <Cart/> </ProtectedRoutes>},
      {path:"category" , element: <ProtectedRoutes> <Category/> </ProtectedRoutes>},
      {path:"login" , element: <Login/>},
      {path:"products" , element: <ProtectedRoutes> <Products/> </ProtectedRoutes>},
      
      {path:"productdetails/:id" , element: <ProtectedRoutes> <ProductDetails/> </ProtectedRoutes>},
      {path:"chickout" , element: <ProtectedRoutes> <OrderPayment/> </ProtectedRoutes>},
      {path:"cashpayment" , element: <ProtectedRoutes> <CashPayment/> </ProtectedRoutes>},
      {path:"allorders" , element: <ProtectedRoutes> <AllOrders/> </ProtectedRoutes>},
      {path:"wishlist" , element: <ProtectedRoutes> <WishList/> </ProtectedRoutes>},
      
      {path:"signup" , element: <Signup/>},
      {path:"forgetpassword" , element: <ForgetPassword/>},
      {path:"resetcode" , element: <ResetCode/>},
      {path:"*" , element: <NotFound/>},
    ]}
  ]);


  let {setToken} = useContext(tokenContext);
useEffect(()=>{
if(localStorage.getItem("userToken")){
  setToken(localStorage.getItem("userToken"));
};
},[]);

  return (<>
  

  <RouterProvider router={routers}></RouterProvider>


  </>
  );
}

export default App;
