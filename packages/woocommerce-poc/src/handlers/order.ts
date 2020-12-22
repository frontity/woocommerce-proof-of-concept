import { Pattern, Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";

const OrderHandler: Pattern<Handler<Packages>> = {
  name: "order",
  priority: 10,
  pattern: "/checkout/order-received/:id(\\d+)/",
  func: async ({ link, params, state }) => {
    Object.assign(state.source.data[link], {
      isOrder: true,
      id: params.id,
    });
  },
};

export default OrderHandler;
