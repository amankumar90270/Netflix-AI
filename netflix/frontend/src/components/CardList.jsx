import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import cardImg from "../assets/cardimg.jpg"
import {Link} from "react-router"

const CardList = ({title, category}) => {
  const [data, setData] = useState([]);
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWJlOGYwODJkOWI5ZWYxZjJhZGY3N2JjMWE2MDAxZiIsIm5iZiI6MTc1MjU4MTIxMy41Nywic3ViIjoiNjg3NjQ0NWQ5MzRiYTY5ZTA0YTdiMGNkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.K4kOBiHKEil2a2P4j1-7kjah5c9ub7TsM4qK7nYX5_s'
  }
};

useEffect(()=>{fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, 
  options)
  .then(res => res.json())
  .then(res => setData(res.results))
  .catch(err => console.error(err));
},[]);
 


  return (
    
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium" >{title}</h2>
 
      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper ">
      {data.map((item, index) =>(
        <SwiperSlide key={index} className="max-w-72" >
          <Link to={`/movie/${item.id}`} >
          <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="" className="h-44 w-full object-center object-cover" />
          <p className="text-center pt-2">{item.original_title}</p>
          </Link>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
};

export default CardList
