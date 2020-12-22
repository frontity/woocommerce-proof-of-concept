import React from "react";
import { styled } from "frontity";
import Link from "../link";

const GoToShop = () => (
  <Container>
    <ShopMessage>Your cart is empty, buy something first!</ShopMessage>
    <ShopLink link="/shop">Go to Shop</ShopLink>
  </Container>
);

export default GoToShop;

const Container = styled.div`
  width: 600px;
  margin: 0;
  padding: 24px;
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
