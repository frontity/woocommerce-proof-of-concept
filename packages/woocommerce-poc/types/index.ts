import { MergePackages, Package, AsyncAction, Action } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import { OrderEntity, ProductEntity } from "./entities";
import { Cart, ShippingAddress, BillingAddress } from "./cart";
import Router from "@frontity/router/types";

interface WooCommerce extends Package {
  name: "woocommerce";
  state: {
    source: {
      product: Record<number, ProductEntity>;
    };
    woocommerce: {
      isCartReady: boolean;
      cart: Cart;
      checkout: {
        customer_note: string;
        payment_method: string;
      };
      order: Record<number, OrderEntity>;
    };
  };
  actions: {
    woocommerce: {
      getCart: AsyncAction<Packages>;
      addItemToCart: AsyncAction<
        Packages,
        {
          id: number;
          quantity: number;
        }
      >;
      removeItemFromCart: AsyncAction<
        Packages,
        {
          key: string;
        }
      >;
      updateItemFromCart: AsyncAction<
        Packages,
        {
          key: string;
          quantity: number;
        }
      >;
      applyCoupon: AsyncAction<
        Packages,
        {
          code: string;
        }
      >;
      removeCoupon: AsyncAction<
        Packages,
        {
          code: string;
        }
      >;
      updateCustomer: AsyncAction<
        Packages,
        {
          shippingAddress?: Partial<ShippingAddress>;
          billingAddress?: Partial<BillingAddress>;
        }
      >;
      setCustomerNote: Action<Packages, { customer_note: string }>;
      setPaymentMethod: Action<Packages, { payment_method: string }>;
      placeOrder:
        | AsyncAction<Packages>
        | AsyncAction<Packages, { payment_data?: unknown }>;
      afterCSR: Action<Packages>;
    };
  };
  libraries: {
    source: {
      handlers: WpSource["libraries"]["source"]["handlers"];
    };
  };
}

export default WooCommerce;

export type Packages = MergePackages<WpSource, Router, WooCommerce>;

export * from "./data";
export * from "./entities";
export * from "./cart";
export * from "./checkout";
