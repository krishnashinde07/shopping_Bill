// OPTIONAL - only if you want Firestore saving
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import type { CartItem } from '../features/products/types'

// put your firebase config into .env (VITE_FIREBASE_API_KEY ...)
// For example: VITE_FIREBASE_API_KEY=abc
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function saveBill(cart: CartItem[], total: number) {
  const docRef = await addDoc(collection(db, 'bills'), {
    cart,
    total,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}
