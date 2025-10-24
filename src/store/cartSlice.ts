import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
  savings: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const offers = {
  soup: { discount: 0, note: "" },
  bread: { discount: 0.5, note: "Buy 2 Soups get 50% off Bread" },
  butter: { discount: 0.4, note: "Buy 2 Butters get 40p off each" },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1, savings: 0 });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0)
          state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    calculateSavings: (state) => {
      state.items.forEach(item => {
        if (item.name === "Bread" && state.items.find(i => i.name === "Soup" && i.quantity >= 2)) {
          item.savings = 0.55;
        } else if (item.name === "Butter" && item.quantity >= 1) {
          item.savings = 0.40;
        } else {
          item.savings = 0;
        }
      });
    },
  },
});

export const { addToCart, removeFromCart, calculateSavings } = cartSlice.actions;
export default cartSlice.reducer;
