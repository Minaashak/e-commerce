import React from 'react'
import Slider from 'react-slick';
import sliderImg1 from "./../../Assits/Slider/slider-image-1.jpeg";
import sliderImg2 from "./../../Assits/Slider/slider-image-2.jpeg";
import sliderImg3 from "./../../Assits/Slider/slider-image-3.jpeg";
import img1 from "./../../Assits/image/img1.jpg";
import img2 from "./../../Assits/image/img2.jpg";




export default function HomeSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false
    };

return (<>
<div className="container my-4 ">
    <div className="row g-0">
        <div className="col-md-9 my-3 p-0">
        <Slider {...settings}>
            <img height={400} key={1} src={sliderImg1} alt={"e-commerce-Slider"} />
            <img height={400} key={2} src={sliderImg2} alt="e-commerce-Slider" />
            <img height={400} key={3} src={sliderImg3} alt="e-commerce-Slider" />
            
        </Slider>
        </div>
        <div className="col-md-3 my-3 d-none d-md-inline ">
            <img className='w-100' height={200} src={img1} alt="e-commerce-Slider" />
            <img className='w-100' height={200} src={img2} alt="e-commerce-Slider" />
        </div>
    </div>
</div>
    </>
)
}
