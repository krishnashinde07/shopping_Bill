import { describe, it, expect } from 'vitest'
import productsReducer, { addToCart, clearCart } from '../../../src/features/products/productsSlice'
import { PRODUCTS } from '../../../src/features/products/productsData'

describe('products slice', () => {
  it('adds product to cart', () => {
    const initial = { cart: [], offers: [] }
    const after = productsReducer(initial as any, addToCart(PRODUCTS[0]))
    expect(after.cart.length).toBe(1)
    expect(after.cart[0].quantity).toBe(1)
  })

  it('clearCart clears', () => {
    const state = { cart: [{ id: 1, name: 'Bread', price: 1.1, quantity: 2 }], offers: [] }
    const after = productsReducer(state as any, clearCart())
    expect(after.cart.length).toBe(0)
  })
})
