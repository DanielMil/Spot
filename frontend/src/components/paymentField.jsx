import React from "react";
import { withRouter } from "react-router";
import Layout from "antd/lib/layout/layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";

class PaymentField extends React.Component {
  render() {
    //open source
    const CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    //open source dummy key
    const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

    return (
      <Layout>
        <Elements stripe={stripePromise}>
          <label>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </label>
        </Elements>
      </Layout>
    );
  }
}

export default withRouter(PaymentField);
