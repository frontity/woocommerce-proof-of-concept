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
      getCart: async ({ state }) => {
        const response = await fetch(`${state.wpSource.api}wc/store/cart/`, {
          method: "GET",
          credentials: "include",
        });

        // TODO: check if the response is an error.
        const cart: Cart = await response.json();

        if (!state.woocommerce.cart) {
          state.woocommerce.cart = cart;
        } else {
          batch(() => merge(state.woocommerce.cart, cart));
        }
      },

      addItemToCart: ({ state }) => async ({ id, quantity }) => {
        const response = await fetch(
          `${state.wpSource.api}wc/store/cart/add-item?id=${id}&quantity=${quantity}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        // TODO: check if the response is an error.
        const cart: Cart = await response.json();
        batch(() => merge(state.woocommerce.cart, cart));
      },

      removeItemFromCart: ({}) => async () => {},

      updateItemFromCart: ({}) => async () => {},

      applyCouponToCart: ({}) => async () => {},

      removeCouponFromCart: ({}) => async () => {},

      updateCustomer: ({}) => async () => {},

      selectShippingRate: ({}) => async () => {},

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
