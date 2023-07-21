import React from 'react'
import img2 from './image/banner.jpg'
import img4 from './image/product2.jpg'
import img5 from './image/product3.jpg'
import img6 from './image/product4.jpg'
import img7 from './image/product5.jpg'
import img8 from './image/product6.jpg'
import img9 from './image/product7.jpg'
import Product from './Product';
import './Home.css'
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_img" src={img2} alt="" />
        <div className="home_row">
          <Product
            id='01'
            title="iphone 14"
            price={11.9}
            rating={5}
            image={img8}
          />
          <Product
            id="02"
            title="Boat Heeadphone's"
            price={12.9}
            rating={4}
            image={img9}
          />

        </div>
        <div className="home_row">
          <Product
            id="03"
            title="Headhone And Speaker"
            price={15.9}
            rating={5}
            image={img4}
          />
          <Product
            id="04"
            title="Watch"
            price={59.9}
            rating={3}
            image={img5}
          />
          <Product
            id="05"
            title="Skin care spray"
            price={69.9}
            rating={4}
            image={img6}
          />
        </div>
        <div className="home_row">
          <Product
            id="06"
            title="Hair care spray"
            price={69.9}
            rating={4}
            image={img7}
          />
        </div>
      </div>
    </div>
  );
}

export default Home
