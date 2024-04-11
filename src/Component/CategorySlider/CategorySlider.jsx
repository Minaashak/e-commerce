import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function Responsive() {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
            }
            }
        ]
    };

    function getAllProduct(){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
    }

    let{data} = useQuery("allCategory" , getAllProduct);


return (<>

    <div className="m-4 slider-container">
        <Slider {...settings}>
            {data?.data?.data.map((ele)=><>
                <img height={300} className='w-100' src={ele.image} key={ele._id} alt={ele.name} />
                <h4 className='h5'>{ele.name}</h4>
            </>)}
        </Slider>
    </div>

</>
)
}
