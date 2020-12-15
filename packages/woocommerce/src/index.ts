import { batch, fetch } from "frontity";
import merge from "lodash.merge";
import WooCommerce, { Cart, Checkout } from "../types";
import ProductHandler from "./handlers/product";
import ShopHandler from "./handlers/shop";
import CartHandler from "./handlers/cart";
import CheckoutHandler from "./handlers/checkout";

const wooCommerce: WooCommerce = {
  name: "woocommerce",
  state: {
    woocommerce: {
      // The cart is initialized in the SSR.
      cart: null,

      // The checkout is null by default.
      checkout: null,
    },
    source: {
      product: {},
    },
  },
  actions: {
    woocommerce: {
      manageCart: ({ state }) => async ({
        method,
        action = "",
        params = {},
        body = undefined,
      }) => {
        const searchParams = new URLSearchParams(params);
        const response = await fetch(
          `${state.wpSource.api}wc/store/cart/${action}?${searchParams}`,
          {
            method,
            credentials: "include",
            body: body && JSON.stringify(body),
          }
        );

        // TODO: check if the response is an error.
        const cart: Cart = await response.json();

        // Update the cart in the state.
        state.woocommerce.cart = cart;
      },

      getCart: async ({ actions }) => {
        await actions.woocommerce.manageCart({ method: "GET" });
      },

      addItemToCart: ({ actions }) => async ({ id, quantity }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "add-item",
          params: { id, quantity },
        });
      },

      removeItemFromCart: ({ actions }) => async ({ key }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "remove-item",
          params: { key },
        });
      },

      updateItemFromCart: ({ actions }) => async ({ key, quantity }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "update-item",
          params: { key, quantity },
        });
      },

      applyCoupon: ({ actions }) => async ({ code }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "apply-coupon",
          params: { code },
        });
      },

      removeCoupon: ({ actions }) => async ({ code }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "remove-coupon",
          params: { code },
        });
      },

      updateCustomer: ({ state, actions }) => async ({
        billingAddress,
        shippingAddress,
      }) => {
        // First, update the current state. This would be overwritten with the
        // REST API response but we can show the changes in advance.
        batch(() => {
          merge(state.woocommerce.cart.billing_address, billingAddress);
          merge(state.woocommerce.cart.shipping_address, shippingAddress);
        });

        // Get updated values from the state.
        const { billing_address, shipping_address } = state.woocommerce.cart;

        await actions.woocommerce.manageCart({
          method: "POST",
          action: "remove-coupon",
          body: { billing_address, shipping_address },
        });
      },

      selectShippingRate: ({ actions }) => async ({ package_id, rate_id }) => {
        await actions.woocommerce.manageCart({
          method: "POST",
          action: "remove-coupon",
          params: { package_id, rate_id },
        });
      },

      getCheckout: async ({ state }) => {
        const response = await fetch(
          `${state.wpSource.api}wc/store/checkout/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        // TODO: check if the response is an error.
        const checkout: Checkout = await response.json();

        if (!state.woocommerce.checkout) {
          state.woocommerce.checkout = checkout;
        } else {
          batch(() => merge(state.woocommerce.checkout, checkout));
        }
      },

      updateCheckout: ({}) => async () => {},

      placeOrder: async ({ state }) => {},

      afterCSR: ({ actions }) => {
        actions.woocommerce.getCart();
        // actions.woocommerce.getCheckout();
      },
    },
  },
  libraries: {
    source: {
      handlers: [ProductHandler, ShopHandler, CartHandler, CheckoutHandler],
    },
  },
};

export default wooCommerce;

export * from "./type-guards";
