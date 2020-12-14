import { ArchiveData, Data } from "@frontity/source/types";

export interface ProductData extends Data {
  isProduct: true;
  id: number;
}

export interface ProductArchiveData extends ArchiveData {
  isProductArchive: true;
  type: "product";
}

export interface CartData extends Data {
  isCart: true;
}
export interface CheckoutData extends Data {
  isCheckout: true;
}
