const express = require("express");
const router = new express.Router();
const Stripe = require("stripe");
const requireLogin = require("../middleware/requireLogin");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/api/charge", requireLogin, async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Email Credits",
      payment_method: id,
      confirm: true,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    return res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
