interface CartItem {
  id: string;
  quantity: number;
  note?: string;
}
interface CartItemCheck extends CartItem {  
  checked: boolean;
}
interface CartItemWithDetails extends CartItemCheck {
  name: string;
  price: number;
}
export type { CartItem, CartItemWithDetails, CartItemCheck };