import { batch } from "frontity";
import { Pattern, Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";
import { isProductEntity } from "../type-guards";
import { ServerError } from "@frontity/source";

const ProductHandler: Pattern<Handler<Packages>> = {
  name: "product",
  priority: 10,
  pattern: "/product/:slug/",
  func: async ({ link, params, state, libraries, force }) => {
    // First, check if the product is already populated.
    let product = Object.values(state.source.product).find(({ permalink }) =>
      permalink.endsWith(link)
    );

    // Fetch it if the product wasn't populated yet.
    if (!product) {
      // We have to fetch first the entity ID using the `/wp/v2/product`
      // endpoint because there is no way to get the product from the
      // WooCommerce API using the entity slug.
      const idResponse = await libraries.source.api.get({
        endpoint: "product",
        params: { slug: params.slug, _fields: ["id"] },
      });
      const [post] = await idResponse.json();
      if (!post) {
        throw new ServerError(
          `No product was found with slug ${params.slug}.`,
          404,
          "Not Found"
        );
      }

      const response = await libraries.source.api.get({
        endpoint: `/wc/store/products/${post.id}`,
      });

      // Manually populate the response. We don't want to use
      // `libraries.source.populate()` here because it doesn't normalize
      // appropriately the entities from the WooCommerce API.
      const entity = await response.json();

      if (isProductEntity(entity)) {
        state.source.product[entity.id] = entity;
        product = entity;
      }
    }

    // Populate the data object.
    batch(() =>
      Object.assign(state.source.data[link], {
        isProduct: true,
        id: product.id,
        sku: product.sku,
      })
    );
  },
};

export default ProductHandler;
