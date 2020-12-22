import WooCommerce, { Checkout } from "../types";
import ProductHandler from "./handlers/product";
import ShopHandler from "./handlers/shop";
import CartHandler from "./handlers/cart";
import CheckoutHandler from "./handlers/checkout";
import OrderHandler from "./handlers/order";
import storeApi from "./store-api";

const wooCommerce: WooCommerce = {
  name: "woocommerce",
  state: {
    woocommerce: {
      isCartReady: false,
      // The cart is initialized in the client side rendering (`afterCSR`).
      cart: {
        coupons: [],
        shipping_rates: [],
        shipping_address: {
          first_name: "",
          last_name: "",
          company: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
        billing_address: {
          first_name: "",
          last_name: "",
          company: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          email: "",
          phone: "",
        },
        items: [],
        items_count: 0,
        items_weight: 0,
        needs_payment: false,
        needs_shipping: false,
        has_calculated_shipping: false,
        totals: {
          total_items: "0",
          total_items_tax: "",
          total_fees: "0",
          total_fees_tax: "",
          total_discount: "0",
          total_discount_tax: "0",
          total_shipping: "",
          total_shipping_tax: "",
          total_price: "",
          total_tax: "",
          tax_lines: [],
          currency_code: "",
          currency_symbol: "",
          currency_minor_unit: 0,
          currency_decimal_separator: "",
          currency_thousand_separator: "",
          currency_prefix: "",
          currency_suffix: "",
        },
        errors: [],
        extensions: {},
      },

      checkout: {
        // The billing_address is stored in the cart. This is just a pointer.
        billing_address: ({ state }) => state.woocommerce.cart?.billing_address,
        // The shipping_address is stored in the cart. This is just a pointer.
        shipping_address: ({ state }) =>
          state.woocommerce.cart?.shipping_address,
        // Payment method is currently hardcoded to "cheque".
        payment_method: "cheque",
        customer_note: "",
      },

      order: {},
    },
    source: {
      product: {},
    },
  },
  actions: {
    woocommerce: {
      getCart: async ({ state }) => {
        state.woocommerce.cart = await storeApi({ state, endpoint: "cart" });
        state.woocommerce.isCartReady = true;
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
        // Update item quantity in the state.
        state.woocommerce.cart.items.find(
          (item) => item.key === key
        ).quantity = quantity;
        // Update backend.
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
        state.woocommerce.cart.billing_address = {
          ...state.woocommerce.cart.billing_address,
          ...billingAddress,
        };
        state.woocommerce.cart.shipping_address = {
          ...state.woocommerce.cart.shipping_address,
          ...shippingAddress,
        };

        // Get updated values from the state.
        const { billing_address, shipping_address } = state.woocommerce.cart;

        // Send the updated values and get the cart updated back.
        await storeApi({
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
        state.woocommerce.order[checkout.order_id] = { checkout, cart };

        // Get the current cart from the REST API. It should be empty now. We
        // don't need to wait for the response here.
        actions.woocommerce.getCart();

        // Finally, this action redirects the user to the order page.
        actions.router.set(checkout.payment_result.redirect_url);
      },

      afterCSR: ({ actions }) => {
        actions.woocommerce.getCart();
      },
    },
  },
  libraries: {
    source: {
      handlers: [
        ProductHandler,
        ShopHandler,
        CartHandler,
        CheckoutHandler,
        OrderHandler,
      ],
    },
  },
};

export default wooCommerce;

export * from "./type-guards";
