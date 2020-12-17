import {
  MergePackages,
  Package,
  AsyncAction,
  Action,
  Derived,
} from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import { OrderEntity, ProductEntity } from "./entities";
import { Cart, ShippingAddress, BillingAddress } from "./cart";

/**
 * Integrate Frontity with WooCommerce.
 */
interface WooCommerce extends Package {
  name: "woocommerce";

  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Map of populated products, by ID.
       */
      product: Record<number, ProductEntity>;

      /**
       * Map of populated orders, by ID.
       */
      order: Record<number, OrderEntity>;
    };

    /**
     * WooCommerce namespace.
     */
    woocommerce: {
      /**
       * Object with the current state of the cart.
       */
      cart: Cart;

      /**
       * Object with the current state of the checkout.
       *
       * Note that this object doesn't have the same structure that the object
       * returned by the Store API.
       */
      checkout: {
        billingAddress: Derived<Packages, BillingAddress>;
        shippingAddress: Derived<Packages, ShippingAddress>;
        customerNote: string;
        paymentMethod: string;
      };
    };
  };

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * WooCommerce namespace.
     */
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

      selectShippingRate: AsyncAction<
        Packages,
        {
          package_id: number;
          rate_id: string;
        }
      >;

      setCustomerNote: Action<Packages, string>;

      setPaymentMethod: Action<Packages, string>;

      placeOrder: AsyncAction<
        Packages,
        {
          paymentData?: unknown;
        }
      >;

      afterCSR: Action<Packages>;
    };
  };

  /**
   * Libraries exposed by this package.
   */
  libraries: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Handlers exposed by the WooCommerce package.
       */
      handlers: WpSource["libraries"]["source"]["handlers"];
    };
  };
}

export default WooCommerce;

export type Packages = MergePackages<WpSource, WooCommerce>;

export * from "./data";
export * from "./entities";
export * from "./cart";
export * from "./checkout";
