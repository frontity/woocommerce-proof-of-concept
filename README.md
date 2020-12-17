# WooCommerce & Frontity [Proof of Concept]

> ⚠️ This is only an experiment of a possible `@frontity/woocommerce` package using the [WooCommerce Store API](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/StoreApi), which is not public yet. Don't use this in production. If you want to know more about this proof of concept -or participate in the conversation- you can go to [this thread](https://community.frontity.org/t/woocommerce-proof-of-concept/3596) in the community.

> ℹ️ This repository is still a **Work In Progress** so some features may not work yet.

## Summary

This repository contains a Frontity project with two packages:

**`woocommerce`**

- Exposes state to be consumed by themes, including products, cart and checkout info.
- Exposes actions to communicate with the [WooCommerce Store API](https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/StoreApi).
- Adds some `@frontity/wp-source` handlers for the product pages and for the cart and checkout pages.
- Also, it exports some types and type guards to be used by themes written in TypeScript.

**`woocommerce-theme`**

- Consumes the state populated and actions exposed by the `woocommerce` package
- Renders pages for the products, the cart, checkout, etc.
- It is based on the `@frontity/mars-theme` starter theme, and all the components related to WooCoomerce are placed into the `/packages/woocommerce-theme/src/components/woocommerce` folder.

## WordPress Setup

You need first a WordPress development instance configured following these steps:

- Create a local WordPress instace (you can use [Local](https://localwp.com/) for that).

- Install the following plugins:

  - [WooCommerce](https://wordpress.org/plugins/woocommerce/) (tested with v4.8.0)
  - [WooCommerce Blocks](https://wordpress.org/plugins/woo-gutenberg-products-block/) (tested with v4.0.0)
  - [Frontity Embedded Mode - [Proof of Concept]](https://github.com/frontity/frontity-embedded-proof-of-concept/)

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

## Frontity Setup

To configure the Frontity project:

- Clone the repository.

  ```bash
  git clone https://github.com/frontity/woocommerce-proof-of-concept.git
  cd woocommerce-proof-of-concept
  ```

- Install the project dependencies.

  ```bash
  npm install
  ```

- Go to the `frontity.settings.js` file and change the `state.source.url` value inside the `@frontity/wp-source` settings to point to your WordPress instance.

  ```js
  {
    name: "@frontity/wp-source",
    state: {
      source: {
        // Set here the URL to your WordPress instance.
        url: "http://woocommercepoc.local",
      },
    },
  },
  ```

## Run the demo

To start the Frontity project:

- Run the `npx frontity dev` command. Note that, for the Embedded Mode to work, the `public-path` parameter needs to be specified.

  ```bash
  npx frontity dev --public-path http://localhost:3000/static --dont-open-browser
  ```

- Navigate to the URL of your WordPress instance (**not to http://localhost:3000**) to see the Frontity site in action.

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
