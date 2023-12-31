import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
    // items: Product[];
    items: { product: Product; cartQuantity: number }[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    updateQuantity: (id: string, newQuantity: number) => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (item) => item.product.id === data.id
                );

                if (existingItemIndex !== -1) {
                    // Item already in cart, increment cartQuantity
                    set((state) => {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].cartQuantity += 1;
                        return { items: updatedItems };
                    });
                } else {
                    // Item not in cart, add to items array with cartQuantity of 1
                    set((state) => {
                        return {
                            items: [
                                ...state.items,
                                { product: data, cartQuantity: 1 },
                            ],
                        };
                    });
                }

                toast.success("Item added to cart.");
            },
            removeItem: (id: string) => {
                set({
                    items: [
                        ...get().items.filter((item) => item.product.id !== id),
                    ],
                });
                toast.success("Item removed from cart.");
            },
            removeAll: () => set({ items: [] }),
            updateQuantity: (id: string, newQuantity: number) => {
                set((state) => {
                    const updatedItems = state.items.map((item) => {
                        if (item.product.id === id) {
                            return { ...item, cartQuantity: newQuantity };
                        }
                        return item;
                    });
                    return { items: updatedItems };
                });
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
