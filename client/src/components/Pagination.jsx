import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Component
 * @param {number} currentPage - Current active page
 * @param {number} totalResults - Total number of results from API
 * @param {Function} onPageChange - Callback when a page button is clicked
 * @param {number} resultsPerPage - Items per page (OMDB default is 10)
 */
const Pagination = ({ currentPage, totalResults, onPageChange, resultsPerPage = 10 }) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container" aria-label="Pagination Navigation">
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={20} />
                <span>Previous</span>
            </button>

            <div className="pagination-info">
                <span>Page</span>
                <span className="current-page">{currentPage}</span>
                <span>of</span>
                <span className="total-pages">{totalPages}</span>
            </div>

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <span>Next</span>
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
