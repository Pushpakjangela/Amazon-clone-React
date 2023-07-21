//api key:  pk_test_51NSOcYSJjgWPQRsKKIAb83Fd4aVvAw9uAWdnbkpyg2jBtW1ygEuxV8f4NxOZCU1mlhd5Cray4PHX8N5Bu5JpIP4A00FIwR22Hk
//Secret key :  sk_test_51NSOcYSJjgWPQRsKLPS5TaS9mbobigZaCOwBHtvystMQFyA52oMw6NDl3cftAY201PXvHBPmLfMVIFcy2nQiBzhP00jUn88Mhn
import React, { useEffect } from "react";
import { useMemo } from "react";
import "./App.css";
import Header from "./Header2";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Signin from "./Signin";
import { auth } from "./firebase";
import Payment from "./Payment3";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51NSOcYSJjgWPQRsKKIAb83Fd4aVvAw9uAWdnbkpyg2jBtW1ygEuxV8f4NxOZCU1mlhd5Cray4PHX8N5Bu5JpIP4A00FIwR22Hk"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>>>", authUser);

      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logout
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM
    <Router>
      <div className="app">
        <Routes>
          <Route path="/checkout" element={[<Checkout />]} />
          <Route path="/orders" element={[<Orders/>]} />
          <Route path="/" element={[<Header />, <Home />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            ]}
          />

          {/* <Route path="/payment" element={[<Header/>,<Elements stripe={promise} ><Payment/></Elements>]} /> */}

          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
