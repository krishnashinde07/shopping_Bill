import type { CartItem, Offer } from '../features/products/types'

/**
 * Calculate offers based on cart items.
 *
 * Rules implemented:
 *  - Bread (id 1): Buy 2 get 1 free -> every 3rd bread is free (saving = floor(q/3) * price)
 *  - Butter (id 5): fixed discount £0.40 each (example from screenshot)
 *  - If subtotal > 10 GBP -> additional 10% off total (applied last)
 */
export function calculateOffers(items: CartItem[]): Offer[] {
  const offers: Offer[] = []

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)

  // Bread BOGOF third free
  const bread = items.find((i) => i.id === 1)
  if (bread && bread.quantity >= 3) {
    const freeCount = Math.floor(bread.quantity / 3)
    const saving = +(freeCount * bread.price).toFixed(2)
    offers.push({
      id: 'bread-b3f',
      description: `Buy 2 get 1 free (Bread) — ${freeCount} free`,
      saving,
    })
  }

  // Butter special: each butter saves 0.40
  const butter = items.find((i) => i.id === 5)
  if (butter && butter.quantity > 0) {
    const saving = +((0.4 * butter.quantity)).toFixed(2)
    offers.push({
      id: 'butter-off',
      description: `Butter offer — £0.40 off each`,
      saving,
    })
  }

  // Order-level discount
  if (subtotal > 10) {
    const saving = +((subtotal * 0.1)).toFixed(2)
    offers.push({
      id: 'ten-percent',
      description: '10% off orders above £10',
      saving,
    })
  }

  return offers
}
