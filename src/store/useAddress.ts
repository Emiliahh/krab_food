import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAddress {
    id: number;
    userName: string;
    phone: string;
    address: string;
}

interface AddressState {
    address: UserAddress[];
    fetDefaultAddress: (address: UserAddress) => void;
    addAddress: (data: UserAddress) => void;
    updateAddress: (data: UserAddress) => void;
    deleteAddress: (id: number) => void;
}

export const useAddressStore = create<AddressState>()(
    persist(
        (set) => ({
            address: [],
            fetDefaultAddress: (data: UserAddress) =>
                set((state) => ({
                    address: [data, ...state.address.filter(a => a.id !== data.id)],
                })),
            addAddress: (data: UserAddress) =>
                set((state) => ({
                    address: [...state.address, data],
                })),
            updateAddress: (data: UserAddress) =>
                set((state) => ({
                    address: state.address.map((item) =>
                        item.id === data.id ? data : item
                    ),
                })),
            deleteAddress: (id: number) =>
                set((state) => ({
                    address: state.address.filter((item) => item.id !== id),
                })),
        }),
        {
            name: "address-store",
        }
    )
);
