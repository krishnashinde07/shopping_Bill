import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, calculateSavings } from "../store/cartSlice";

const products = [
  { id: "1", name: "Bread", price: 1.10 },
  { id: "2", name: "Milk", price: 0.50 },
  { id: "3", name: "Cheese", price: 0.90 },
  { id: "4", name: "Soup", price: 0.60 },
  { id: "5", name: "Butter", price: 1.20 },
];

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span>{p.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">£ {p.price.toFixed(2)}</span>
              <button
                onClick={() => {
                  dispatch(addToCart(p));
                  dispatch(calculateSavings());
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
