import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import { OrderData } from "frontity-woocommerce-poc/types";

interface Props {
  when?: boolean;
  data: OrderData;
}

const Order: React.FC<Props> = ({ data }) => {
  const { state } = useConnect<Packages>();

  // Get the order information from the store, if it exists.
  const order = state.woocommerce.order[data.id];

  return (
    <Container>
      <h2>Order received</h2>
      <p>Thank you. Your order has been received.</p>
      <div>
        {/* TODO: Improve the way we show the order data. */}
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
