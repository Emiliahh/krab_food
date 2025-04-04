import { CartItem } from "@/types/cartTypes";
import { create } from 'zustand'

interface CartState {
    cartItems: CartItem[];
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeItem: (id: string) => void;
    addItem: (item: CartItem) => void;
    clearCart: () => void;
    changenote:(id:string, note:string)=>void
}
const useCartStore = create<CartState>()((set)=>({
    cartItems: [],
    
    increaseQuantity: (id: string) => set((state) => {
        const cartItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { cartItems };
    }
    ),

    decreaseQuantity: (id: string) => set((state) => {
        const cartItems = state.cartItems.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        return { cartItems };
    }
    ),

    removeItem: (id: string) => set((state) => {
        const cartItems = state.cartItems.filter((item) => item.id !== id);
        return { cartItems };
    }
    ),

    addItem: (item: CartItem) => set((state) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            const cartItems = state.cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
            );
            return { cartItems };
        } else {
            return { cartItems: [...state.cartItems, item] };
        }
    }
    ),
    clearCart: () => set({ cartItems: [] }),

    changenote:(id:string, note:string)=>set((state)=>{
        const cartItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, note: note } : item
        );
        return { cartItems };
    })
}))
export default useCartStore;