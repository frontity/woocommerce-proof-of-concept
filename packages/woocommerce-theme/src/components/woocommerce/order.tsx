import React from "react";
import { connect, useConnect, styled } from "frontity";
import { isOrder } from "@frontity/woocommerce";
import { Packages } from "../../../types";

const Order: React.FC<{ when?: boolean }> = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);
  if (!isOrder(data)) return null;

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

export default connect(Order);

const Container = styled.div`
  width: 600px;
  margin: 0;
  padding: 24px;
`;
