import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, fetchProducts } from "../store/productslice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery, currentPage } = useSelector((state) => state.products);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = () => {
    dispatch(setSearchQuery(localQuery));
    dispatch(fetchProducts({ page: 1, limit: 8, searchQuery: localQuery }));
  };

  const handleClear = () => {
    setLocalQuery(""); // Clear input field
    dispatch(setSearchQuery(""));
    dispatch(fetchProducts({ page: 1, limit: 8, searchQuery: "" }));
  };

  return (
    <div className="flex flex-wrap items-center justify-center my-4 gap-2">
      {/* Search Input */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 pr-14"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 rounded-full px-2 py-1 text-sm hover:bg-gray-400 transition-all"
          >
            ✖
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;