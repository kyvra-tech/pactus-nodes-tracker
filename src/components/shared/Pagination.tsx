import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPageNumbersToShow = 5;

  const getPageNumbers = () => {
    const pages = [];
    const halfWindow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage <= halfWindow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    } else if (currentPage + halfWindow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <nav
        className="flex flex-wrap items-center justify-center gap-1 sm:gap-2"
        aria-label="Pagination"
      >
        {/* FIRST PAGE */}
        <button
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md border text-xs sm:text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>

        {/* PREVIOUS PAGE */}
        <button
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md border text-xs sm:text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* PAGE NUMBERS */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md border text-xs sm:text-sm font-medium ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* NEXT PAGE */}
        <button
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md border text-xs sm:text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        {/* LAST PAGE */}
        <button
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md border text-xs sm:text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
