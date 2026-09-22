export type CartLine = {
  productId: string;
  quantity: number;
};

export type CheckoutLine = {
  productId: string;
  quantity: number;
};

export type CheckoutSessionResult = {
  url: string | null;
  message: string;
};
