import React from "react";
import { connect, useConnect, styled } from "frontity";
import { BillingAddress } from "woocommerce/types";
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

  // Get the data of the product.
  const { billing_address } = cart;

  const updateBillingField = (field: keyof BillingAddress) => (e) => {
    actions.woocommerce.updateCustomer({
      billingAddress: {
        [field]: e.target.value,
      },
    });
  };

  return (
    <Container>
      <Summary>Summary</Summary>
      <Form>
        <h2>Contact information</h2>
        <FormSection>
          <BillingField label="Email address" field="email" />
          <Field>
            <label>Phone number</label>
            <input type="text" value={billing_address.phone} />
          </Field>
        </FormSection>
        <h2>Billing Address</h2>
        <FormSection>
          <Field>
            <label>First name</label>
            <input type="text" value={billing_address.first_name} />
          </Field>
          <Field>
            <label>Last name</label>
            <input type="text" value={billing_address.last_name} />
          </Field>
          <Field>
            <label>Address</label>
            <input type="text" value={billing_address.address_1} />
          </Field>
          <Field>
            <label>Address (2nd line)</label>
            <input type="text" value={billing_address.address_2} />
          </Field>
          <Field>
            <label>City</label>
            <input type="text" value={billing_address.city} />
          </Field>
          <Field>
            <label>State</label>
            <input type="text" value={billing_address.state} />
          </Field>
          <Field>
            <label>Postcode</label>
            <input type="text" value={billing_address.postcode} />
          </Field>
        </FormSection>
        <h2>Payment method</h2>
        <p>Only check payments are allowed right now</p>
        <h2>Notes</h2>
        <FormSection>
          <textarea />
        </FormSection>
        <button>return to cart</button>
        <button type="submit">Place order</button>
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

const Field = styled.div`
  label {
    display: block;
    padding: 2px 0;
    color: #444;
    font-size: 0.8em;
  }

  input,
  textarea {
    border-style: solid;
    border-width: 1px;
    width: 95%;
    padding: 0 8px;
    line-height: 2;
    min-height: 30px;
    box-shadow: 0 0 0 transparent;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
    margin: 0 1px;
    font-size: 1.2em;
  }
`;

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
