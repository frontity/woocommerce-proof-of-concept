# WooCommerce & Frontity [Proof of Concept]

> ⚠️ This is only an experiment of a possible `@frontity/woocommerce` package using the [WooCommerce Store API](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/StoreApi), which is not public yet. Don't use this in production. If you want to know more about this proof of concept -or participate in the conversation- you can go to [this thread](https://community.frontity.org/t/woocommerce-proof-of-concept/3596) in the community.

> ⚠️️ This repository is still a **Work In Progress** so some features may not work yet.

## Summary

This repository contains a Frontity project with two packages:

**`woocommerce-poc`**

- Exposes state to be consumed by themes, including products, cart and checkout info.
- Exposes actions to communicate with the [WooCommerce Store API](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/StoreApi).
- Adds some `@frontity/wp-source` handlers for the product pages and for the cart and checkout pages.
- Also, it exports some types and type guards to be used by themes written in TypeScript.

**`woocommerce-theme`**

- Consumes the state populated and actions exposed by the `woocommerce` package
- Renders pages for the products, the cart, checkout and order.
- It is based on the `@frontity/mars-theme` starter theme, and all the components related to WooCoomerce are placed into the `/packages/woocommerce-theme/src/components/woocommerce` folder.

## What it does

Here's a list of the things you can do with this proof of concept:

- [x] List all products
- [x] View products
- [x] Add simple products to the cart
- [x] Modify the quantity of each product in the cart
- [x] Remove items from the cart
- [x] Do the checkout
- [x] Place an order and preview it

## What it doesn't do

These ones were not implemented yet:

- [ ] List products by category
- [ ] List products by tag
- [ ] List products by attribute
- [ ] Search and filter products
- [ ] Show product reviews
- [ ] Show related products
- [ ] Handle product collections
- [ ] Use coupons
- [ ] Change the payment method ("cheque" is hardcoded)
- [ ] Show orders after closing or refreshing the app
- [ ] Post previews for products

## Run the demo

To setup and run the Frontity project, simply follow these steps:

- Clone the repository.

  ```bash
  git clone https://github.com/frontity/woocommerce-proof-of-concept.git
  cd woocommerce-proof-of-concept
  ```

- Install the project dependencies.

  ```bash
  npm install
  ```

- Run the `npx frontity dev` command to start the project in development mode.

  ```bash
  npx frontity dev
  ```

---

## WordPress Setup - _optional_

By default, the Frontity project uses https://woocommerce.frontity.org as the WordPress source. You can check [this message](https://community.frontity.org/t/woocommerce-proof-of-concept/3596/7) in the community to know more about how it is configured.

It can be run with your own WordPress but only in Embedded mode, because the Store API uses cookies and the `SameSite` setting they have by default doesn't allow it to be used by a different domain.

So, if you prefer to use your own instance, you can set it up in Embedded mode following these steps:

- Create a WordPress instace. If you are working in your own machine, you can use [Local](https://localwp.com/) for that.

- Install the following plugins:

  - [WooCommerce](https://wordpress.org/plugins/woocommerce/) (tested with v4.8.0)
  - [WooCommerce Blocks](https://wordpress.org/plugins/woo-gutenberg-products-block/) (tested with v4.0.0)
  - [Frontity Embedded Mode - [Proof of Concept]](https://github.com/frontity/frontity-embedded-proof-of-concept/)

    > ⚠️ This plugin is required to avoid cross-site issues. See [this thread](https://community.frontity.org/t/woocommerce-proof-of-concept/3596/9) in the community for more information.

- The following code snippet should be added as well. It disables the nonce check for all of the Store API endpoints that require nonces.

  ```php
  add_action( 'rest_api_init', function () {
    add_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );
  });
  ```

- Once the WooCommerce plugin is installed and activated, the WooCommercee configuration wizard will show up. Just skip it by clicking on _"Skip setup store details"_.

  WooCommerce should have created these pages:

  - Cart — _Cart Page_
  - Checkout — _Checkout Page_
  - My account — _My Account_ Page
  - Shop — _Shop Page_

- To add some product examples, you can import the WooCommerce sample data as explained in their [docs](https://docs.woocommerce.com/document/importing-woocommerce-sample-data/).

- Now, in _"WooCommerce > Settings > Payments"_, enable the _"Check payments"_ method.

- After that, go back to the Frontity project and, in the `frontity.settings.js` file, point the `state.source.url` setting inside `@frontity/wp-source` to your WordPress instance.

  ```js
  {
    name: "@frontity/wp-source",
    state: {
      source: {
        // Set here the URL to your WordPress instance.
        url: "http://my-woocommerce.local",
      },
    },
  },
  ```

- To run the project, you should add the `public-path` argument this time.

  ```bash
  npx frontity dev --public-path http://localhost:3000/static
  ```

- Navigate to the URL of your WordPress instance (**not to http://localhost:3000**) to see the Frontity site in action.

If you want to deploy this to a real server remember to use `frontity build`:

```bash
npx frontity build --public-path https://your-frontity-domain.com/static
```

---

## Frontity Channels 🌎

[![Community Forum Topics](https://img.shields.io/discourse/topics?color=blue&label=community%20forum&server=https%3A%2F%2Fcommunity.frontity.org%2F)](https://community.frontity.org/) [![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity) ![Frontity Github Stars](https://img.shields.io/github/stars/frontity/frontity?style=social)

We have different channels at your disposal where you can find information about the Frontity project, discuss it and get involved:

- 📖 **[Docs](https://docs.frontity.org)**: this is the place to learn how to build amazing sites with Frontity.
- 👨‍👩‍👧‍👦 **[Community](https://community.frontity.org/)**: use our forum to [ask any questions](https://community.frontity.org/c/dev-talk-questions), feedback and meet great people. This is your place too to share [what are you building with Frontity](https://community.frontity.org/c/showcases)!
- 🐞 **[GitHub](https://github.com/frontity)**: we use GitHub for bugs and pull requests. Questions are answered in the [community forum](https://community.frontity.org/)!
- 🗣 **Social media**: a more informal place to interact with Frontity users, reach out to us on [Twitter](https://twitter.com/frontity).
- 💌 **Newsletter**: do you want to receive the latest framework updates and news? Subscribe [here](https://frontity.org/)

### » Get involved 🤗

Got questions or feedback about Frontity? We'd love to hear from you. Use our [community forum](https://community.frontity.org) yo ! ❤️

Frontity also welcomes contributions. There are many ways to support the project! If you don't know where to start, this guide might help: [How to contribute?](https://docs.frontity.org/contributing/how-to-contribute)
