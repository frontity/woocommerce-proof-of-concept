import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import Link from "../link";
import { renderPrice } from "./utils";

/**
 * Component that renders the cart page.
 */
const Cart: React.FC = () => {
  // Get the frontity state.
  const { state } = useConnect<Packages>();

  // Get the data of the product.
  const { cart } = state.woocommerce;

  // If there's no cart yet, just return null.
  if (!cart) return null;

  return (
    <Container>
      <Title>Your cart ({cart.items_count} items)</Title>
      <div>
        {cart.items.map((item) => (
          <Item key={item.key}>
            <ItemImage>
              <img src={item.images[0].thumbnail} alt="" />
            </ItemImage>
            <ItemProduct>
              <ItemTitle link={item.permalink}>{item.name}</ItemTitle>
              <ItemDescription
                dangerouslySetInnerHTML={{ __html: item.short_description }}
              />
            </ItemProduct>
            <ItemQuantity>{item.quantity}</ItemQuantity>
            <ItemTotal>
              {item.prices.price !== item.prices.regular_price && (
                <ItemRegularPrice>
                  <del>
                    {renderPrice({
                      quantity: item.quantity,
                      amount: item.prices.regular_price,
                      currency: item.prices,
                    })}
                  </del>
                </ItemRegularPrice>
              )}
              <ItemPrice>
                {renderPrice({
                  quantity: item.quantity,
                  amount: item.prices.price,
                  currency: item.prices,
                })}
              </ItemPrice>
            </ItemTotal>
          </Item>
        ))}
        <Total>
          <TotalTitle>Total</TotalTitle>
          <TotalAmount>
            {renderPrice({
              amount: cart.totals.total_price,
              currency: cart.totals,
            })}
          </TotalAmount>
        </Total>
        <Checkout link={"/checkout"}>Proceed to Checkout</Checkout>
      </div>
    </Container>
  );
};

export default connect(Cart, { injectProps: false });

const Container = styled.div`
  width: 600px;
  margin: 0;
  padding: 48px 0 96px;
`;

const Title = styled.h2``;

const Item = styled.div`
  display: grid;
  grid-template-columns: 80px 130px;
  padding: 16px 0;
  border-bottom: 1px solid lightgray;
`;

const ItemImage = styled.div`
  grid-column-start: 1;
  grid-row-start: 1;
  padding-right: 16px;

  img {
    width: 100%;
  }
`;

const ItemProduct = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  justify-self: stretch;
  margin-right: 24px;
  padding-bottom: 16px;
`;

const ItemTitle = styled(Link)`
  font-size: 1.5rem;

  & {
    text-decoration: underline;
  }
`;

const ItemDescription = styled.div`
  p {
    margin: 0.25em 0 0;
  }
`;

const ItemQuantity = styled.div`
  grid-column-start: 1;
  grid-row-start: 2;
  vertical-align: bottom;
  padding-right: 16px;
  align-self: end;
  padding-top: 16px;
`;

const ItemTotal = styled.div`
  grid-column: 2 / span 2;
  grid-row-start: 2;
  align-self: end;
  justify-self: end;
  padding-bottom: 0.375em;
`;

const ItemRegularPrice = styled.div`
  color: #aaa;
`;

const ItemPrice = styled.div``;

const Total = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.75em 0;
  width: 100%;
  font-size: 2em;
`;

const TotalTitle = styled.div`
  flex-grow: 1;
`;

const TotalAmount = styled.div``;

const Checkout = styled(Link)`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background: #333;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
`;
