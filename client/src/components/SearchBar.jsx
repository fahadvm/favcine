import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * @param {Function} onSearch - Callback function to handle the search submission
 * @param {string} placeholder - Decorative placeholder text
 */
const SearchBar = ({ onSearch, placeholder = "Search for movies..." }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="search-bar-form"
            role="search"
            aria-label="Movie search"
        >
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} aria-hidden="true" />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="search-input-new"
                    aria-label="Search movies"
                    autoComplete="off"
                />

                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Clear search"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                )}

                <button
                    type="submit"
                    className="search-submit-btn"
                    disabled={!query.trim()}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
