import React, { useState, useEffect } from 'react';
import movieService from '../services/movieService.js';
import { useFavorites } from '../hooks/useFavorites.js';
import MovieList from '../components/MovieList.js';
import SearchBar from '../components/SearchBar.js';
import useDebounce from '../hooks/useDebounce.js';
import Pagination from '../components/Pagination.js';
import ErrorMessage from '../components/ErrorMessage.js';
import Hero from '../components/Hero.js';
import MovieSkeleton from '../components/MovieSkeleton.js';
import { Movie } from '../types/index.js';

/**
 * Home Component
 * Manages the landing page experience with both Trending and Search states.
 */
const Home: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const { isFavorite, toggleFavorite } = useFavorites();
    const debouncedQuery = useDebounce<string>(query, 500);

    const performSearch = async (searchTerm: string, pageNumber: number = 1) => {
        setSearchLoading(true);
        setError(null);
        try {
            const data = await movieService.searchMovies(searchTerm, pageNumber);
            if (data.movies) {
                setMovies(data.movies);
                setTotalResults(data.totalResults || 0);
            } else {
                setMovies([]);
                setTotalResults(0);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch movies.');
            setMovies([]);
        } finally {
            setSearchLoading(false);
        }
    };

    /**
     * Logic Effect:
     * Synchronizes the UI state with the current query and page number.
     */
    useEffect(() => {
        const searching = !!debouncedQuery;
        setIsSearching(searching);

        const searchTerm = searching ? debouncedQuery : 'Marvel';
        performSearch(searchTerm, page);

    }, [debouncedQuery, page]);

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const scrollTarget = isSearching ? 0 : 600;
        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    };

    const scrollToSearch = () => {
        const searchBar = document.querySelector('.search-bar-form');
        if (searchBar) {
            searchBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="home-page">
            {!isSearching && <Hero onStartExploring={scrollToSearch} />}

            <SearchBar onSearch={handleSearch} />

            <div className="section-header">
                <h2 className="page-title">
                    {isSearching ? `Search results for "${query}"` : "Trending Now"}
                </h2>
            </div>

            {error ? (
                <ErrorMessage
                    message={error}
                    onRetry={() => performSearch(isSearching ? query : 'Marvel', page)}
                />
            ) : searchLoading ? (
                <MovieSkeleton />
            ) : (
                <div className="fade-in">
                    <MovieList
                        movies={movies}
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                        emptyMessage={isSearching ? `No movies found for "${query}"` : "Unable to load trending movies."}
                    />

                    {movies.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalResults={totalResults}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
