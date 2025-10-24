import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BasketItem from "./BasketItem";

const Basket: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalSavings = items.reduce((acc, i) => acc + i.savings, 0);
  const total = subtotal - totalSavings;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Basket</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your basket is empty</p>
      ) : (
        <>
          {items.map((i) => (
            <BasketItem key={i.id} {...i} />
          ))}

          <div className="mt-6 text-sm">
            <div className="flex justify-between mb-1">
              <span>Sub Total:</span>
              <span>£ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Savings:</span>
              <span className="text-red-600">£ {totalSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-green-700">
              <span>Total Amount:</span>
              <span>£ {total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
