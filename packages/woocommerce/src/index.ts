import { batch, fetch } from "frontity";
import merge from "lodash.merge";
import WooCommerce, { Checkout } from "../types";
import ProductHandler from "./handlers/product";
import ShopHandler from "./handlers/shop";
import CartHandler from "./handlers/cart";
import CheckoutHandler from "./handlers/checkout";
import storeApi from "./store-api";

const wooCommerce: WooCommerce = {
  name: "woocommerce",
  state: {
    woocommerce: {
      // The cart is initialized in the SSR.
      cart: null,

      // The checkout is null by default.
      checkout: {
        billing_address: ({ state }) => state.woocommerce.cart?.billing_address,
        shipping_address: ({ state }) =>
          state.woocommerce.cart?.shipping_address,
        payment_method: "",
        customer_note: "",
      },
    },
    source: {
      product: {},
      order: {},
    },
  },
  actions: {
    woocommerce: {
      getCart: async ({ state }) => {
        state.woocommerce.cart = await storeApi({ state, endpoint: "cart" });
      },

      addItemToCart: ({ state }) => async ({ id, quantity }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/add-item",
          method: "POST",
          params: { id, quantity },
        });
      },

      removeItemFromCart: ({ state }) => async ({ key }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/remove-item",
          method: "POST",
          params: { key },
        });
      },

      updateItemFromCart: ({ state }) => async ({ key, quantity }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/update-item",
          method: "POST",
          params: { key, quantity },
        });
      },

      applyCoupon: ({ state }) => async ({ code }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/apply-coupon",
          method: "POST",
          params: { code },
        });
      },

      removeCoupon: ({ state }) => async ({ code }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/remove-coupon",
          method: "POST",
          params: { code },
        });
      },

      updateCustomer: ({ state }) => async ({
        billingAddress = {},
        shippingAddress = {},
      }) => {
        // First, update the current state. This would be overwritten with the
        // REST API response but we can show the changes in advance.
        batch(() => {
          merge(state.woocommerce.cart.billing_address, billingAddress);
          merge(state.woocommerce.cart.shipping_address, shippingAddress);
        });

        // Get updated values from the state.
        const { billing_address, shipping_address } = state.woocommerce.cart;

        // Send the updated values and get the cart updated back.
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: "cart/update-customer",
          method: "POST",
          body: { billing_address, shipping_address },
        });
      },

      selectShippingRate: ({ state }) => async ({ package_id, rate_id }) => {
        state.woocommerce.cart = await storeApi({
          state,
          endpoint: `cart/select-shipping-rate/${package_id}`,
          method: "POST",
          params: { rate_id },
        });
      },

      setCustomerNote: ({ state }) => (customer_note) => {
        state.woocommerce.checkout.customer_note = customer_note;
      },

      setPaymentMethod: ({ state }) => (payment_method) => {
        state.woocommerce.checkout.payment_method = payment_method;
      },

      placeOrder: ({ state, actions }) => async (payment_data = {}) => {
        const {
          billing_address,
          shipping_address,
          payment_method,
          customer_note,
        } = state.woocommerce.checkout;

        // Get the checkout result from the REST API.
        const checkout: Checkout = await storeApi({
          state,
          endpoint: "checkout",
          method: "POST",
          body: {
            billing_address,
            shipping_address,
            payment_method,
            customer_note,
            payment_data,
          },
        });

        // Get the current cart from the state.
        const { cart } = state.woocommerce;

        // Create an order entity putting all the information together.
        state.source.order[checkout.order_id] = { checkout, cart };

        // Get the current cart from the REST API. It should be empty now. We
        // don't need to wait for the response here.
        actions.woocommerce.getCart();
      },

      afterCSR: ({ actions }) => {
        actions.woocommerce.getCart();
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
