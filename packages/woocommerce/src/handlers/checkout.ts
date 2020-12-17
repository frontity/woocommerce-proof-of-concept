import { batch } from "frontity";
import { Pattern, Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";

const CheckoutHandler: Pattern<Handler<Packages>> = {
  name: "checkout",
  priority: 11,
  pattern: "/checkout/",
  func: async ({ link, state }) => {
    // Just assign the `isCheckout` boolean.
    batch(() =>
      Object.assign(state.source.data[link], {
        isCheckout: true,
      })
    );
  },
};

export default CheckoutHandler;
