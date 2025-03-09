import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/productslice.js";

const CreatePage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields!");
      return;
    }

    dispatch(addProduct(newProduct)).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1000); // Hide after 3s
    });

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5">
          Create New Product
        </h1>

        <div className="flex flex-col gap-3">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>

        {/* ✅ Notification Popup */}
        {showNotification && (
          <div className="fixed top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            ✅ Product Added Successfully!
          </div>
        )}

        {/* Show error if request failed */}
        {status === "failed" && (
          <p className="mt-3 text-red-500 text-center">❌ {error}</p>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
