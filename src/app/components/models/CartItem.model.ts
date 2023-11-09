export type Cart = Array<CartItem>;

export type CartItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
};
