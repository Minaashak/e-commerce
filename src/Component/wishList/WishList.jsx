import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../Context/wishList'
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function WishList() {


    let{displayWishList ,removeProductFromWishList } = useContext(wishListContext);
    const[ wishListProd , setWishListProd ]=useState();
    const[ wishListCount , setWishListCount ]=useState();
    const[loading , setIsLoading] = useState(true);
    let {addToCart,setNumOfCartItem} = useContext(CartContext);

    async function showWishList(){
        setIsLoading(false);
        let res = await displayWishList();
        setWishListProd(res?.data);
        setWishListCount(res?.data?.count);
        setIsLoading(true);
    }

    async function removeProduct( value){
        setIsLoading(false);
        let res = await removeProductFromWishList(value);

        if(res.data.status === "success"){
            toast.success(res?.data?.message)
        }
        setIsLoading(true);
        showWishList();
    }

    // !---Add to cart function
    async function addCartItem(id){
        setIsLoading(false);
        let addCart =await addToCart(id);
        if(addCart?.data?.status === "success"){
            toast.success(addCart?.data?.message);
            setNumOfCartItem(addCart?.data?.numOfCartItems)
        };
        setIsLoading(true);
        
    };
    
    useEffect(()=>{
        showWishList()
    },[])

return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
            </Helmet>

{loading? <>  
    <div className="container min-height">
        {wishListCount == 0 ? <>
        <h2 className='bg-main-color p-4 my-4'> Wish List is Empty:</h2>
        </> :<>
        <div className="row my-4">
            <div className="bg-main-color">
                {wishListProd?.data?.map((ele)=> <div key={ele?.id} className="wish-Cart d-md-flex d-block  p-3 border-bottom">
                    <div className="col-md-2 px-3 col-sm-12 my-3">
                        <img src={ele?.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10 px-3 col-sm-12 align-self-center">
                        <h4 className='title-prod-col'>{ele?.title.split(" ").splice(0,2).join(" ") }</h4>
                        <p>{ele?.price} EGP</p>
                        <div className="d-md-flex d-block justify-content-between ">
                            <button onClick={()=>removeProduct(ele?.id)}  className='btn m-1 btn-danger'><i className="fa-solid fa-trash-can"></i> Remove</button>
                            <button onClick={()=>addCartItem(ele?.id)} className=' btn-color  btn  text-white m-1 '>Add To Cart</button>
                        </div>
                    </div>
                </div>)}
                
            </div>
        </div>
        </>}
    </div>

</> : <>
<div className={`load`}>
            <PropagateLoader color="#08ac0a"/>
        </div>
</>  }
    
    </>
)
}
