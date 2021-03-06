const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // for gzipping on heroku
  app.use(compression());

  // PWA - https (redirect http to https)
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // serve static file in client/build
  app.use(express.static(path.join(__dirname, "client/build")));
  // hit all route > serve html in client/build
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

// PWA - service worker
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

// stripe payment
app.post("/payment", (req, res) => {
  // get token value from req > pass to stripe
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "twd", // change the currency reflected to current locale
  };
  // make payment charge to stripe
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
