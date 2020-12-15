import { MergePackages, Package, AsyncAction, Action } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import { ProductEntity } from "./entities";
import { Cart, ShippingAddress, BillingAddress } from "./cart";
import { Checkout } from "./checkout";

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
       * TODO: implement this.
       */
      checkout: Checkout;
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
      manageCart: AsyncAction<
        Packages,
        {
          method: "GET" | "POST" | "PUT";
          action?: string;
          params?: Record<string, any>;
          body?: unknown;
        }
      >;

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

      getCheckout: AsyncAction<Packages>;

      updateCheckout: AsyncAction<
        Packages,
        {
          shippingAddress?: ShippingAddress;
          billingAddress?: BillingAddress;
          customerNote?: string;
          paymentMethod?: string;
        }
      >;

      placeOrder: AsyncAction<Packages>;

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
