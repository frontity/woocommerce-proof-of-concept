import { Data, Entity } from "@frontity/source/types";
import {
  ProductData,
  ProductArchiveData,
  CartData,
  CheckoutData,
} from "../types/data";
import { ProductEntity } from "../types/entities";

export function isProduct(data: Data): data is ProductData {
  return (data as ProductData).isProduct;
}

export function isProductArchive(data: Data): data is ProductArchiveData {
  return (data as ProductArchiveData).isProductArchive;
}

export function isCart(data: Data): data is CartData {
  return (data as CartData).isCart;
}

export function isCheckout(data: Data): data is CheckoutData {
  return (data as CheckoutData).isCheckout;
}

export function isProductEntity(entity: Entity): entity is ProductEntity {
  return typeof (entity as ProductEntity).sku === "string";
}
