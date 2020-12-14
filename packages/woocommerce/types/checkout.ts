import { BillingAddress, ShippingAddress } from "./cart";

export interface PaymentResults {
  payment_status: string;
  redirect_url: string;
  payment_details: [];
}

export interface Checkout {
  order_id: number;
  status: string;
  order_key: string;
  customer_note: string;
  customer_id: number;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_result: PaymentResults;
}
