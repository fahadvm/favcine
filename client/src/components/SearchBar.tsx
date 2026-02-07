import React, { useState, ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

/**
 * SearchBar Component
 * Focused on a modern, real-time "search-as-you-type" experience.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search for movies..." }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="search-bar-form" role="search">
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} aria-hidden="true" />

                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-input-new"
                    aria-label="Search movies"
                    autoComplete="off"
                    autoFocus
                />

                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Clear search"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
