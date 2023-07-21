import React from "react";
import Header from "./Header2";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

// import img4 from './image/product2.jpg'

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  // console.log("this is the ",basket);
  return (
    <div className="checkout_main">
      <Header />
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="checkout_ad"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMMLOUmKNTeGxB62fRjtIKnQfR-pxpgJxnbPzlcAg9qU_hoVqF_ts_J4_OfIVHcHO3g&usqp=CAU"
            alt=""
          />
          <div>
            <h2>{!user ? "Guest" : user.email}</h2>
            <h2 className="checkout_title">Your Shopping Basket</h2>

            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                rating={item.rating}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
