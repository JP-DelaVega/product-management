import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-6 pb-6">
      {/* Previous Button - Slightly Smaller */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md border text-sm transition-all ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white border-gray-400"
        }`}
      >
        &larr; Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md border transition-all ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "hover:bg-blue-100 border-gray-400"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button - Slightly Smaller */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md border text-sm transition-all ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white border-gray-400"
        }`}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
