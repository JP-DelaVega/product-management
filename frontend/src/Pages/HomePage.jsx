import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  editProduct,
  setPage,
} from "../store/productslice";
import ProductCards from "../components/ProductCards";
import Modal from "../components/Modal"; // Make sure this is imported
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({
    isShow: false,
    message: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    products = [],
    status,
    currentPage,
    totalPages,
    searchQuery,
  } = useSelector((state) => state.products);

  useEffect(() => {
    console.log("Fetching products with:", {
      page: currentPage,
      limit: 8,
      searchQuery,
    });
    dispatch(fetchProducts({ page: currentPage, limit: 8, searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    setNotification((prev) => ({
      isShow: true, // Update only isShow
      message: "Deleted Successfully",
    }));
    setTimeout(
      () =>
        setNotification((prev) => ({
          ...prev, // Spread the previous state
          isShow: false, // Update only isShow
        })),
      1000
    );
  };

  // Dispatch updated data to Redux
  const handleEdit = async (productId, updatedProduct) => {
    try {
      await dispatch(
        editProduct({ productId, updatedData: updatedProduct })
      ).unwrap();
      dispatch(fetchProducts({ page: currentPage, limit: 8, searchQuery }));
      setSelectedProduct(null); // ✅ Close modal
      setNotification({ isShow: true, message: "Edited Successfully" });
      setTimeout(() => setNotification({ isShow: false, message: "" }), 1000);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {"Something went wrong!"}</p>;

  return (
    <div className="mt-10 text-gray-500 text-lg">
      <SearchBar />
      {products.length > 0 ? (
        <div className="flex flex-wrap gap-6 p-6 justify-center">
          {products.map((product, index) => (
            <ProductCards
              key={product._id || index}
              product={product}
              onDelete={handleDelete}
              onOpen={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center text-gray-500 text-lg">
          <p className="mb-2">No products found.</p>
          <Link
            to="/create"
            className="text-blue-500 hover:underline font-semibold"
          >
            Create Product
          </Link>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setPage(page))}
      />

      {selectedProduct && (
        <Modal
          isOpen={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          value={selectedProduct}
          onSave={handleEdit}
        />
      )}
      {/* ✅ Notification Popup */}
      {notification.isShow && (
        <div className="fixed top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          ✅ {notification.message}
        </div>
      )}
    </div>
  );
}

export default HomePage;
