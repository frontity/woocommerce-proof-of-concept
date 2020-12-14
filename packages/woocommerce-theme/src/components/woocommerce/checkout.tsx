import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";

/**
 * Component that renders the checkout page.
 */
const Checkout: React.FC = () => {
  // Get the frontity state.
  const { state } = useConnect<Packages>();

  // Get the data of the product.
  const { checkout } = state.woocommerce;

  return (
    <Container>
      <div>
        <pre>{JSON.stringify(checkout, null, 2)}</pre>
      </div>
    </Container>
  );
};

export default connect(Checkout, { injectProps: false });

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;
