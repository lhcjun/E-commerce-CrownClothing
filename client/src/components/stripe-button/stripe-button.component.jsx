import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import Logo from "../../assets/logo.svg";
import { paymentSuccess } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, paymentSuccess }) => {
  const priceForStript = price * 100; // cents = dollars * 100
  const publishableKey = "pk_test_HpdrfhAH2rIpZrDUnAYzcJN300RaDSqqJJ";

  const onToken = token => {
    axios({
      // data for req
      url: "payment",
      method: 'post',
      data: {
        amount: priceForStript,
        token: token
      }
    })
      .then(res => {
        alert('Payment Successful');
        paymentSuccess();
      })
      .catch(error => {
        console.log('Payment error: ', error);
        alert('There was an issue with your payment. Please make sure you use the provided credit card');
      })
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      shippingAddress
      billingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStript} /* cents */
      panelLabel="Pay Now"
      token={onToken} /* submit -> callback */
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  paymentSuccess: () => dispatch(paymentSuccess())
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
