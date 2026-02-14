import React, { useState, useMemo, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';
import MovieList from '../components/MovieList.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorMessage from '../components/ErrorMessage.js';
import Pagination from '../components/Pagination.js';

const ITEMS_PER_PAGE = 10;

const Favorites: React.FC = () => {
    const { favorites, loading, error, toggleFavorite, isFavorite, refresh } = useFavorites();
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Reset to page 1 if favorites count changes in a way that makes current page invalid
    useEffect(() => {
        const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [favorites.length, currentPage]);

    const currentFavorites = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return favorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [favorites, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) {
        return <ErrorMessage message={error} onRetry={refresh} />;
    }

    if (loading) {
        return <LoadingSpinner message="Loading your favorites..." />;
    }

    return (
        <div className="favorites-page content">
            <h1 className="page-title">My Favorites</h1>

            <MovieList
                movies={currentFavorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                emptyMessage="You haven't added any favorite movies yet."
            />

            {favorites.length > ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalResults={favorites.length}
                    onPageChange={handlePageChange}
                    resultsPerPage={ITEMS_PER_PAGE}
                />
            )}
        </div>
    );
};

export default Favorites;
