import { batch } from "frontity";
import { Pattern, Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";
import { isProductEntity } from "../type-guards";
import { DataEntity } from "@frontity/source/types";

const ShopHandler: Pattern<Handler<Packages>> = {
  name: "shop",
  priority: 10,
  pattern: "/shop/",
  func: async ({ link, state, libraries, force }) => {
    const linkParams = libraries.source.parse(link);

    const response = await libraries.source.api.get({
      endpoint: `/wc/store/products/`,
      params: {
        page: linkParams.page,
      },
    });

    // Manually populate the response. We don't want to use
    // `libraries.source.populate()` here because it doesn't normalize
    // appropriately the entities from the WooCommerce API.
    const entities = await response.json();

    const items: DataEntity[] = entities.map((entity) => {
      // Add the entity to the state.
      if (isProductEntity(entity)) {
        state.source.product[entity.id] = entity;
      }

      // Return the properties to find the entity in the state.
      return {
        type: "product",
        id: entity.id,
        link: entity.permalink,
      };
    });

    const total = libraries.source.getTotal(response, items.length);
    const totalPages = libraries.source.getTotalPages(response, 0);

    // returns true if next page exists
    const hasNewerPosts = linkParams.page < totalPages;
    // returns true if previous page exists
    const hasOlderPosts = linkParams.page > 1;

    const getPageLink = (page: number) =>
      libraries.source.stringify({ ...linkParams, page });

    // Populate the data object.
    batch(() =>
      Object.assign(state.source.data[link], {
        isArchive: true,
        isProductArchive: true,
        type: "product",
        items,
        total,
        totalPages,
        // Add next and previous if they exist.
        ...(hasOlderPosts && { previous: getPageLink(linkParams.page - 1) }),
        ...(hasNewerPosts && { next: getPageLink(linkParams.page + 1) }),
      })
    );
  },
};

export default ShopHandler;
