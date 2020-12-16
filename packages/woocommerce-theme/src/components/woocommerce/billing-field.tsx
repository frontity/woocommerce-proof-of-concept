import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import { BillingAddress } from "woocommerce/types";
import { debounce } from "ts-debounce";

type BillingFieldProps = {
  label: string;
  field: keyof BillingAddress;
};

/**
 * Component that renders the checkout page.
 */
const Checkout: React.FC<BillingFieldProps> = ({ label, field }) => {
  // Get the frontity state.
  const { state, actions } = useConnect<Packages>();

  // Get the data of the field value.
  const realValue = state.woocommerce.cart.billing_address[field];

  // Create state for this field value.
  const [value, setValue] = React.useState(realValue);

  // Debounced function to update the billing info in the server.
  const updateBillingField = React.useRef(
    debounce((value: string) => {
      actions.woocommerce.updateCustomer({
        billingAddress: {
          [field]: value,
        },
      });
    }, 400)
  );

  // Update the current field value each time it changes in the frontity state.
  React.useEffect(() => {
    setValue(realValue);
  }, [realValue]);

  return (
    <Field>
      <label htmlFor={`billing-${field}`}>{label}</label>
      <input
        id={`billing-${field}`}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateBillingField.current(e.target.value);
        }}
      />
    </Field>
  );
};

export default connect(Checkout, { injectProps: false });

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
