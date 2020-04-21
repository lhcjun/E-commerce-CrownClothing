import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Logo from "../../assets/logo.svg";

const StripeCheckoutButton = ({ price }) => {
  const priceForStript = price * 100; // cents = dollars * 100
  const publishableKey = "pk_test_HpdrfhAH2rIpZrDUnAYzcJN300RaDSqqJJ";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      shippingAddress
      billingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStript} // cents
      panelLabel="Pay Now"
      token={onToken} // submit -> callback
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
