import React from 'react'
import type { CartItem, Offer } from '../features/products/types'

export default function Summary({ cart, offers }: { cart: CartItem[]; offers: Offer[] }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0)
  const totalSavings = offers.reduce((s, o) => s + o.saving, 0)
  const finalTotal = +(subtotal - totalSavings).toFixed(2)

  return (
    <div className="mt-6 text-sm">
      <div className="flex justify-between mb-1">
        <span>Sub Total:</span>
        <span>£ {subtotal.toFixed(2)}</span>
      </div>

      <div>
        {offers.length > 0 && (
          <div className="mb-2">
            <div className="text-gray-700 font-medium">Offers applied:</div>
            <ul className="text-sm">
              {offers.map((o) => (
                <li key={o.id} className="flex justify-between">
                  <span>{o.description}</span>
                  <span className="text-red-600">£ {o.saving.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between mb-1">
        <span>Savings:</span>
        <span className="text-red-600">£ {totalSavings.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg text-green-700">
        <span>Total Amount:</span>
        <span>£ {finalTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}
