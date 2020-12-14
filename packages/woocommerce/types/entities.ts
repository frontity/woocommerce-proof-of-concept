import { Entity } from "@frontity/source/types";

/**
 * Entity that represents a WooCommerce product.
 */
export interface ProductEntity extends Entity {
  id: number;
  name: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: ProductPrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductTerm[];
  tags: ProductTerm[];
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: null;
  sold_individually: boolean;
  quantity_limit: number;
  add_to_cart: ProductAddToCart;
}

/**
 * All information related to the price of a product.
 */
export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: string | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

/**
 * Image data of a product.
 */
export interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

/**
 * Product term data (for categories and tags).
 */
export interface ProductTerm {
  id: number;
  name: string;
  slug: string;
  link: string;
}

/**
 * Product attribute.
 *
 * TODO: define types here.
 */
export interface ProductAttribute {}

/**
 * Product variation.
 *
 * TODO: define types here.
 */
export interface ProductVariation {}

/**
 * Information related to the "add to cart" button of a product.
 */
export interface ProductAddToCart {
  /**
   * The text of the button.
   */
  text: string;

  /**
   * Description of the button.
   */
  description: string;

  /**
   * URL pointed by the button.
   */
  url: string;
}
