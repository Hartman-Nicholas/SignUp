import React from "react";
import { useDispatch } from "react-redux";
import { handlePayment } from "../store/actions/index";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      border: "1px solid",
      iconColor: "teal",
      color: "black",
      fontWeight: 400,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const RenderForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      try {
        dispatch(handlePayment(id, 500));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h4>Test Card Details:</h4>
      <p>Card Number: 4242 4242 4242 4242</p>
      <p>Exp Date: 12/30</p>
      <p>CVC: 132</p>
      <p>ZIP: 11528</p>
      <div style={{ border: "1px solid", margin: "10px 0px" }}>
        <CardElement options={CARD_OPTIONS} />
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        disabled={!stripe}
        name="action"
      >
        Pay 5$
        <i class="material-icons right">send</i>
      </button>
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const CheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <RenderForm />
    </Elements>
  );
};

export default CheckoutForm;
