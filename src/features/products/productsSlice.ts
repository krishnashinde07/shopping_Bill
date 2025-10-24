import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Offer, Product } from './types'
import { calculateOffers } from '../../utils/offers'

interface ProductsState {
  cart: CartItem[]
  offers: Offer[]
}

const initialState: ProductsState = {
  cart: [],
  offers: [],
}

const findIndex = (cart: CartItem[], id: number) => cart.findIndex((c) => c.id === id)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const idx = findIndex(state.cart, action.payload.id)
      if (idx >= 0) {
        state.cart[idx].quantity += 1
      } else {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
        })
      }
      state.offers = calculateOffers(state.cart)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idx = findIndex(state.cart, action.payload)
      if (idx >= 0) state.cart.splice(idx, 1)
      state.offers = calculateOffers(state.cart)
    },
    setQuantity: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const { id, qty } = action.payload
      const idx = findIndex(state.cart, id)
      if (idx >= 0) {
        state.cart[idx].quantity = Math.max(0, qty)
        if (state.cart[idx].quantity === 0) {
          state.cart.splice(idx, 1)
        }
      }
      state.offers = calculateOffers(state.cart)
    },
    clearCart: (state) => {
      state.cart = []
      state.offers = []
    },
    recalcOffers: (state) => {
      state.offers = calculateOffers(state.cart)
    },
  },
})

export const { addToCart, removeFromCart, setQuantity, clearCart, recalcOffers } = productsSlice.actions
export default productsSlice.reducer
