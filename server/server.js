const express = require("express");
const cors = require("cors");
const bodyparser = reuqire("body-parser");

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
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        currency: "EUR",
        product_data: {
          name: item.name,
          images: [item.product],
        },
        unit_amount: item.price * 100,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/sucess.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });
  } catch (error) {}
});
