import type { Product } from '../types';

export type OfferResult = { saving: number; description?: string };

export function round(n: number) {
  return Math.round(n * 100) / 100;
}

export const offers: Record<string, (product: Product, qty: number) => OfferResult | null> = {
  bread: (p, qty) => {
    const groupsOf3 = Math.floor(qty / 3);
    if (groupsOf3 <= 0) return null;
    const saving = groupsOf3 * (p.price * 0.5);
    return { saving: round(saving), description: 'Every 3rd Bread 50% off' };
  },
  butter: (p, qty) => {
    if (qty <= 0) return null;
    const saving = qty * (p.price * (1 / 3));
    return { saving: round(saving), description: 'Butter 33% off' };
  }
};
