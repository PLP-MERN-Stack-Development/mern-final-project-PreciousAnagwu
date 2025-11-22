// src/stores/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  toggleCart: () => void;
  addItem: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: (email: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      toggleCart: () => set({ isOpen: !get().isOpen }),

      addItem: (product) => {
        const existingItem = get().items.find(i => i.id === product.id);
        if (existingItem) {
          set({
            items: get().items.map(i =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map(i => i.id === id ? { ...i, quantity } : i)
        });
      },

      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

      clearCart: () => set({ items: [] }),

      // ✅ Paystack checkout without auth
      checkout: (email: string) => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address");
          return;
        }

        const NGN_RATE = 1480; // e.g., 1 USD = 1000 NGN
        const totalAmount = get().items.reduce((sum, item) => sum + item.price * item.quantity * NGN_RATE, 0) * 100; // kobo
        const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
        
         // ✅ Debug logs added
  console.log("PaystackPop =", (window as any).PaystackPop);
  console.log("Public key =", publicKey);

        const handler = new (window as any).PaystackPop.setup({
          key: publicKey,
          email,
          amount: totalAmount,
          currency: "NGN",
          callback: function(response: any) {
            alert("Payment successful! Reference: " + response.reference);
            get().clearCart();
          },
          onClose: function() {
            alert("Payment popup closed.");
          }
        });

        handler.openIframe();
      },
    }),
    {
      name: "shop-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
