// !----Logo-Import
import Logo from "../../Assits/image/freshcart-logo.svg"

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContext } from "../../Context/tokenContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {


  let{token , setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  let{numOfCartItem} = useContext(CartContext);

  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");

  }

  return (<>
  
<nav  className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container">
    <Link className="navbar-brand" to={"/home"}>
      <img src={Logo} alt="E-Commerce-Logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token ? <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/home"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/cart"}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/wishlist"}>WishList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/products"}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/category"}>Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/brands"}>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/allorders"}>AllOrders</Link>
        </li>
        
      </ul> : " "}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0  align-items-center">
          <div className=" d-flex align-items-center">
            <i className="fa-brands fa-instagram mx-1" />
            <i className="fa-brands fa-facebook mx-1" />
            <i className="fa-brands fa-tiktok mx-1" />
            <i className="fa-brands fa-twitter mx-1" />
            <i className="fa-brands fa-linkedin mx-1" />
            <i className="fa-brands fa-youtube mx-1" />
            {token ?<>
          
          <li className="position-relative me-2 p-1">
              <Link to={"cart"}>
                <i className="fa-solid fa-cart-shopping "> <span className="position-absolute style  font">{numOfCartItem}</span> </i>
              </Link>
          </li>
          <li className="nav-item d-flex align-items-center p-1">            
          <button onClick={logOut} className="nav-link active" aria-current="page" to={"/login"}>LogOut</button>
        </li>
          </>  : <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/signup"}>SignUp</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
        </li>
        </>}
          </div>

          

        
        
      </ul>
      
    </div>
  </div>
</nav>

  
  </>
  )
}
