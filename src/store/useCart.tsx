import {  CartItemCheck } from "@/types/cartTypes";
import { create } from 'zustand'

interface CartState {
    cartItems: CartItemCheck[];
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    changeChecked: (id: string, checked: boolean) => void;
    checkAll: (checked: boolean) => void;
    removeItem: (id: string) => void;
    countCheckedItems: () => number;
    addItem: (item: CartItemCheck) => void;
    clearCart: () => void;
    changeNote:(id:string, note:string)=>void;
    getSelected: () => CartItemCheck[]
}
const useCartStore = create<CartState>()((set, get)=>({
    cartItems: [],
    
    increaseQuantity: (id: string) => set((state) => {
        const cartItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { cartItems };
    }
    ),
    countCheckedItems:()=>{
        const state = get().cartItems;
        const checkedItems = state.filter((item) => item.checked);
        return checkedItems.length;
    },

    decreaseQuantity: (id: string) => set((state) => {
        const cartItems = state.cartItems.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        return { cartItems };
    }
    ),
    changeChecked: (id: string, checked: boolean) => set((state) => {
        const cartItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, checked: checked } : item
        );
        return { cartItems };
    }
    ),
    checkAll: (checked: boolean) => set((state) => {
        const cartItems = state.cartItems.map((item) => {
            return { ...item, checked: checked };
        });
        return { cartItems };
    }),
    removeItem: (id: string) => set((state) => {
        const cartItems = state.cartItems.filter((item) => item.id !== id);
        return { cartItems };
    }
    ),

    addItem: (item: CartItemCheck) => set((state) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            const cartItems = state.cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
            );
            return { cartItems };
        } else {
            return { cartItems: [...state.cartItems, {
                ...item,
                checked: false,
            }] };
        }
    }
    ),
    clearCart: () => set({ cartItems: [] }),

    changeNote:(id:string, note:string)=>set((state)=>{
        const cartItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, note: note } : item
        );
        return { cartItems };
    }),
    getSelected: () => {    
        return get().cartItems.filter(item => item.checked);
    }
}))
export default useCartStore;