import React, { useEffect } from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Header from "./Header2";
import { useState } from "react";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { badgeClasses } from "@mui/material";

function Payment() {
  const Navigate = useNavigate();
  const [{ user, basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisable] = useState(true);
  const [clientSecret, SetclientSecret] = useState(true);

  useEffect(() => {
    // generatethe special stripe secret which allows allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'POST',
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      SetclientSecret(response.data.clientSecret);
    }
    getClientSecret();
  }, [basket]);

  console.log("the secret is >>>", clientSecret);
  console.log("oho", user);

  /*const handlesubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({paymentIntent}) => {
        // paymentIntent = payment confirmation
        if(!paymentIntent){
          Navigate("/orders");
        }

        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent?.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        Navigate("/orders", { replace: true });
      });
  };*/

  const handlesubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // const payload = await stripe
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          return;
        }

        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        Navigate("/orders",{replace:true});
      });
  };

  const handleChange = (event) => {
    setDisable(event.target);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>Checkout {<Link to="/checkout">({basket?.length} items)</Link>}</h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>169 Anand Nagar</p>
            <p>Bhopal,(M.P)</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review item and delivery</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Pament Method</h3>
          </div>
          <div className="payment_detail">
            {/* stripe magic */}
            <form onSubmit={handlesubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total : {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
