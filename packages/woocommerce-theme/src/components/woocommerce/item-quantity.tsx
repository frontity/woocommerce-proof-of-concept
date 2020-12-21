import React from "react";
import { connect, useConnect, styled } from "frontity";
import { CartItem } from "@frontity/woocommerce/types";
import { Packages } from "../../../types";

type ItemQuantityProps = {
  item: CartItem;
};

const ItemQuantity: React.FC<ItemQuantityProps> = ({ item }) => {
  const { actions } = useConnect<Packages>();
  return (
    <Input
      type="number"
      step="1"
      min="1"
      max=""
      name="quantity"
      value={item.quantity}
      onChange={(event) => {
        // Change the item quantity in the state first.
        item.quantity = parseInt(event.target.value, 10) || 0;

        // Then, send a request to update it in the server.
        const { key, quantity } = item;
        actions.woocommerce.updateItemFromCart({ key, quantity });
      }}
      title="Qty"
      size={4}
      placeholder=""
      inputMode="numeric"
    />
  );
};

export default connect(ItemQuantity);

const Input = styled.input`
  margin-right: 16px;
  padding-left: 1em;
  max-width: 4em;
  height: 2.5em;
`;
