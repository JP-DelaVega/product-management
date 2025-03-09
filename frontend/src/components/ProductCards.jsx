import React from "react";
import { Trash2 } from "lucide-react";

function ProductCards({ product, onOpen, onDelete }) {
  return (
    <div
      onClick={onOpen}
      className="relative bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer text-center w-full sm:w-[48%] md:w-[30%] lg:w-[22%] border border-gray-200"
    >
      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening on delete click
          onDelete(product._id);
        }}
      >
        <Trash2 size={18} />
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto max-h-40 object-contain rounded-md mb-3 bg-white p-2"
      />

      {/* Product Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

      {/* Product Price */}
      <p className="text-lg font-semibold text-blue-700">${product.price}</p>
    </div>
  );
}

export default ProductCards;
