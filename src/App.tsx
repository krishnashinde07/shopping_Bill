import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addItem, removeItem } from "./store/basketSlice";

const products = [
  { name: "Bread", price: 1.1 },
  { name: "Milk", price: 0.5 },
  { name: "Cheese", price: 0.9 },
  { name: "Soup", price: 0.6 },
  { name: "Butter", price: 1.2 },
];

function App() {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket.items);

  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const savings = basket.reduce((sum, item) => sum + item.savings, 0);
  const total = subtotal - savings;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🧾 Shopping Bill Calculator
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between border-b pb-2"
              >
                <span>{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">£ {p.price.toFixed(2)}</span>
                  <button
                    onClick={() => dispatch(addItem(p))}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basket Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Basket</h2>

          {basket.length === 0 ? (
            <p className="text-gray-500">No items in basket</p>
          ) : (
            basket.map((item) => (
              <div key={item.name} className="border-b pb-3 mb-3">
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span>£ {item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
                  <span>
                    Item price £{item.price.toFixed(2)} × {item.quantity} = £
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(addItem(item))}
                      className="bg-blue-500 text-white w-6 h-6 rounded"
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(removeItem(item.name))}
                      className="bg-blue-500 text-white w-6 h-6 rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
                {item.savings > 0 && (
                  <p className="text-red-600 text-sm mt-1">
                    Savings £{item.savings.toFixed(2)}
                  </p>
                )}
                <p className="text-sm mt-1">
                  Item cost £
                  {(item.price * item.quantity - item.savings).toFixed(2)}
                </p>
              </div>
            ))
          )}

          {/* Totals */}
          {basket.length > 0 && (
            <div className="mt-6 text-sm">
              <div className="flex justify-between mb-1">
                <span>Sub Total:</span>
                <span>£ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Savings:</span>
                <span className="text-red-600">£ {savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-green-700">
                <span>Total Amount:</span>
                <span>£ {total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
