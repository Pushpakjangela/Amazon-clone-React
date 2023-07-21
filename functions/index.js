const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NSOcYSJjgWPQRsKLPS5TaS9mbobigZaCOwBHtvystMQFyA52oMw6NDl3cftAY201PXvHBPmLfMVIFcy2nQiBzhP00jUn88Mhn"
);

// Api :-

// --APP CONFIG:-
const app = express();

// -Middleeware
app.use(cors({origin: true}));
app.use(express.json());

// -Api routes
app.get("/", (request, response) => response.status(200).send("hellow world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request boom !!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);
