import React from "react";
import { connect, useConnect, styled } from "frontity";
import { OrderData } from "woocommerce/types";
import { Packages } from "../../../types";

type OrderProps = {
  data: OrderData;
};

/**
 * Component that renders an order page.
 *
 * @param props - Object of type {@link OrderProps}.
 */
const Order: React.FC<OrderProps> = ({ data }) => {
  // Get the frontity state.
  const { state } = useConnect<Packages>();

  // Get the order information from the store, if it exists.
  const order = state.source.order[data.id];

  return (
    <Container>
      <h2>Order received</h2>
      <p>Thank you. Your order has been received.</p>
      <div>
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </div>
    </Container>
  );
};

export default connect(Order, { injectProps: false });

const Container = styled.div`
  width: 600px;
  margin: 0;
  padding: 24px;
`;
