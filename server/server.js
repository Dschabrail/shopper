const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51OT8QiJbIN7bJt7jdMK9DeldBl4xNy9qF6V6e0iCQEoetvZPcpEUW2iw8lAaOtwwdtC3VzE6TNDMKm4FCTicXDg000t90r9Wb2"
);

app.post("/checkout", async (req, res, next) => {
  try {
    console.log("Anfrage empfangen:", req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["AT", "DE"],
      },
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "EUR",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://shopper.dschabrail-isaev.at:3001/success.html",
      cancel_url: "https://shopper.dschabrail-isaev.at:3001/cancel.html",
    });
    console.log("Session created successfully");
    res.status(200).json(session);
  } catch (error) {
    console.error("Error during session creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => console.log("app is running on 3001"));
