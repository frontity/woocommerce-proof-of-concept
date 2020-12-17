import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import Loading from "../loading";
import Link from "../link";
import BillingField from "./billing-field";

/**
 * Component that renders the checkout page.
 */
const Checkout: React.FC = () => {
  // Get the frontity state.
  const { state, actions } = useConnect<Packages>();
  const { cart } = state.woocommerce;

  // If there's no cart yet, just return null.
  if (!cart) return <Loading />;

  // If cart is empty, return a message and a "go to shop" button.
  if (cart.items.length === 0)
    return (
      <Container>
        <ShopMessage>Your cart is empty, buy something first!</ShopMessage>
        <ShopLink link="/shop">Go to Shop</ShopLink>
      </Container>
    );

  const { customer_note } = state.woocommerce.checkout;

  return (
    <Container>
      <Summary>Summary</Summary>
      <Form>
        <h2>Contact information</h2>
        <FormSection>
          <BillingField
            label="Email address"
            field="email"
            type="email"
            required
          />
          <BillingField label="Phone number" field="phone" type="tel" />
        </FormSection>
        <h2>Billing Address</h2>
        <FormSection>
          <BillingField label="First name" field="first_name" required />
          <BillingField label="Last name" field="last_name" required />
          <BillingField label="Address" field="address_1" required />
          <BillingField label="Adderss (2nd line)" field="address_2" />
          <BillingField label="City" field="city" required />
          <BillingField label="State" field="state" required />
          <BillingField label="Postcode" field="postcode" required />
        </FormSection>
        <h2>Payment method</h2>
        <p>Only check payments are allowed right now</p>
        <h2>Notes</h2>
        <FormSection>
          <TextArea
            value={customer_note}
            onChange={(e) => {
              actions.woocommerce.setCustomerNote(e.target.value);
            }}
          />
        </FormSection>
        <button>return to cart</button>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            // Do nothing if `paymentMethod` was not specified yet.
            if (!state.woocommerce.checkout.payment_method) return;

            await actions.woocommerce.placeOrder();
          }}
        >
          Place order
        </button>
      </Form>
    </Container>
  );
};

export default connect(Checkout, { injectProps: false });

const Container = styled.div`
  width: 600px;
  margin: 0;
  padding: 24px;
`;

const Summary = styled.div``;

const Form = styled.div``;

const FormSection = styled.div``;

const ShopMessage = styled.h2`
  text-align: center;
`;

const ShopLink = styled(Link)`
  display: block;
  box-sizing: border-box;
  margin: 3em auto 0;
  padding: 1em;
  background: #333;
  color: white !important;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  width: fit-content;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 4em;
`;
