import React from "react";
import { Global, css, connect, styled, Head, useConnect } from "frontity";
import Switch from "./custom/switch";
import { isArchive, isPostType, isError } from "@frontity/source";
import {
  isProduct,
  isProductArchive,
  isCart,
  isCheckout,
  isOrder,
} from "woocommerce-poc";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import PageError from "./page-error";
import Product from "./woocommerce/product";
import Shop from "./woocommerce/shop";
import Cart from "./woocommerce/cart";
import Checkout from "./woocommerce/checkout";
import Order from "./woocommerce/order";
import { Packages } from "../../types";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          {/* These are the new pages introduced for WooCommerce */}
          <Shop data={isProductArchive(data) && data} />
          <Product data={isProduct(data) && data} />
          <Cart when={isCart(data)} />
          <Checkout when={isCheckout(data)} />
          <Order data={isOrder(data) && data} />
          {/* These are the normal WordPress pages */}
          <List data={isArchive(data) && data} />
          <Post data={isPostType(data) && data} />
          <PageError data={isError(data) && data} />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
