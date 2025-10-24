import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  price: number;
}

interface BasketItem extends Product {
  quantity: number;
  savings: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.name === action.payload.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, savings: 0 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const existing = state.items.find(i => i.name === action.payload);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.name !== action.payload);
      }
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;
