import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import { BillingAddress } from "woocommerce-poc/types";
import { debounce } from "ts-debounce";

type BillingFieldProps = {
  label: string;
  field: keyof BillingAddress;
} & React.HTMLProps<HTMLInputElement>;

/**
 * Component that renders the fields of the checkout.
 */
const BillingField: React.FC<BillingFieldProps> = ({
  label,
  field,
  ...inputProps
}) => {
  // Get the frontity state.
  const { state, actions } = useConnect<Packages>();

  // Get the data of the field value.
  const value = state.woocommerce.cart.billing_address[field];

  // Debounced function to update the billing info in the server.
  const updateBillingField = React.useCallback(
    debounce((value: string) => {
      actions.woocommerce.updateCustomer({
        billingAddress: {
          [field]: value,
        },
      });
    }, 1000),
    []
  );

  return (
    <Field>
      <label htmlFor={`billing-${field}`}>{label}</label>
      <input
        id={`billing-${field}`}
        type="text"
        value={value}
        onChange={(e) => {
          // First update it in the state.
          state.woocommerce.cart.billing_address[field] = e.target.value;
          // Then, call the debounced method to update it in the server.
          e.target.checkValidity();
          if (e.target.reportValidity()) updateBillingField(e.target.value);
        }}
        {...inputProps}
      />
    </Field>
  );
};

export default connect(BillingField, { injectProps: false });

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
