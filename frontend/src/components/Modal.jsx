import { useState } from "react";

const Modal = ({ onClose, value, onSave }) => {
  // Local state to handle form updates
  const [updatedProduct, setUpdatedProduct] = useState({
    name: value.name,
    price: value.price,
    image: value.image,
  });

  // Update state when input changes
  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Dispatch updated data to Redux

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm transition-opacity">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all scale-95 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
            Update Product
          </h1>
          <div className="flex flex-col gap-3">
            <input
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
            <input
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              type="number"
            />
            <input
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
            />
            <button
              onClick={() => onSave(value._id, updatedProduct)} // ✅ Pass a function reference
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
