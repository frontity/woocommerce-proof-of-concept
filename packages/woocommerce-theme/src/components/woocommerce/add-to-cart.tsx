import React from "react";
import { connect, useConnect, styled } from "frontity";
import { ProductAddToCart } from "woocommerce/types";
import { Packages } from "../../../types";

type AddToCartProps = ProductAddToCart & {
  id: number;
  showQuantity?: boolean;
};

const AddToCart: React.FC<AddToCartProps> = ({
  text,
  description,
  url,
  id,
  showQuantity = false,
}) => {
  // Connect to the Frontity store.
  const { state, actions } = useConnect<Packages>();
  const { cart } = state.woocommerce;
  const { addItemToCart } = actions.woocommerce;

  // Get the item and its current quantity.
  const item = cart && cart.items.find((p) => p.id === id);
  const currentQuantity = item ? item.quantity : 0;

  // Save an internal counter. The value in the cart is updated when the button
  // is clicked.
  const [quantity, setQuantity] = React.useState(1);

  // Internal value to know if an action is peding.
  const [isPending, setIsPending] = React.useState(false);

  return (
    <Container>
      {showQuantity && (
        <Input
          type="number"
          step="1"
          min="1"
          max=""
          name="quantity"
          value={quantity}
          onChange={(event) =>
            setQuantity(parseInt(event.target.value, 10) || 0)
          }
          title="Qty"
          size={4}
          placeholder=""
          inputMode="numeric"
        />
      )}
      <ButtonContainer>
        <Button
          title={description}
          onClick={async () => {
            // Do nothing if a task is pending.
            if (isPending) return;

            setIsPending(true);
            await addItemToCart({ id, quantity });
            setIsPending(false);
          }}
        >
          {isPending ? "Adding to cart..." : text}
        </Button>
        <Quantity css={{ opacity: currentQuantity ? 1 : 0 }}>
          {currentQuantity}
        </Quantity>
      </ButtonContainer>
    </Container>
  );
};

export default connect(AddToCart, { injectProps: false });

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  padding: 1em;
  max-width: 4em;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Quantity = styled.div`
  position: absolute;
  background: orangered;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  --size: 1.8em;
  min-width: var(--size);
  height: var(--size);
  border-radius: calc(var(--size) * 0.5);
  padding: calc(var(--size) * 0.15);
  box-sizing: border-box;
  top: calc(var(--size) * -0.3);
  right: calc(var(--size) * -0.3);
  transition: opacity 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1em 1em;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;
