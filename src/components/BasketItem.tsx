import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, calculateSavings } from "../store/cartSlice";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  savings: number;
}

const BasketItem: React.FC<Props> = ({ id, name, price, quantity, savings }) => {
  const dispatch = useDispatch();
  const itemCost = price * quantity - savings;

  return (
    <div className="border-b pb-3 mb-3">
      <div className="flex items-center justify-between">
        <span>{name}</span>
        <span>£ {price.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
        <span>
          Item price £{price.toFixed(2)} * {quantity} = £{(price * quantity).toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              dispatch(addToCart({ id, name, price }));
              dispatch(calculateSavings());
            }}
            className="bg-blue-500 text-white w-6 h-6 rounded"
          >
            +
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              dispatch(removeFromCart(id));
              dispatch(calculateSavings());
            }}
            className="bg-blue-500 text-white w-6 h-6 rounded"
          >
            -
          </button>
        </div>
      </div>
      {savings > 0 && (
        <p className="text-red-600 text-sm mt-1">Savings £{savings.toFixed(2)}</p>
      )}
      <p className="text-sm">Item cost £{itemCost.toFixed(2)}</p>
    </div>
  );
};

export default BasketItem;
