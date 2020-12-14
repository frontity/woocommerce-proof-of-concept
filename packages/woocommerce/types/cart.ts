import { ProductPrices, ProductImage } from "./entities";

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface BillingAddress extends ShippingAddress {
  email: string;
  phone: string;
}

export interface Totals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string | null;
  total_shipping_tax: string | null;
  total_price: string;
  total_tax: string;
  tax_lines: [];
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Cart {
  coupons: string[];
  shipping_rates: string[];
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  items: CartItem[];
  items_count: number;
  items_weight: number;
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  totals: Totals;
  errors: [];
  extensions: {};
}

export interface CartItem {
  key: string;
  id: number;
  quantity: number;
  quantity_limit: number;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: ProductImage[];
  variation: [];
  prices: CartItemPrices;
  totals: CartItemTotals;
  catalog_visibility: string;
  extensions: {};
}

export interface CartItemPrices extends ProductPrices {
  raw_prices: {
    precision: number;
    price: string;
    regular_price: string;
    sale_price: string;
  };
}

export interface CartItemTotals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}
