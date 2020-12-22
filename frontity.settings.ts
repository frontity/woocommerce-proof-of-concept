import { Settings } from "frontity/types";
import Source from "@frontity/source/types";
import WooCommerce from "woocommerce-poc/types";
import WooCommerceTheme from "woocommerce-theme/types";

const settings: Settings<Source | WooCommerce | WooCommerceTheme> = {
  name: "woocommerce-poc",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "woocommerce-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Shop", "/shop/"],
          ],
          autoPrefetch: "hover",
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://woocommerce.frontity.org",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "woocommerce-poc",
  ],
};

export default settings;
