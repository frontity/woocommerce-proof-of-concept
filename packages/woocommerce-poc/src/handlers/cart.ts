import { Pattern, Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";

const CartHandler: Pattern<Handler<Packages>> = {
  name: "cart",
  priority: 10,
  pattern: "/cart/",
  func: async ({ link, state }) => {
    // Just assign the `isCart` boolean.
    Object.assign(state.source.data[link], {
      isCart: true,
    });
  },
};

export default CartHandler;
