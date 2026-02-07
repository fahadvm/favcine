import { useState, useEffect } from 'react';
import movieService from '../services/movieService';
import { useFavorites } from '../hooks/useFavorites';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';
import Pagination from '../components/Pagination'; // Assuming Pagination component is imported

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const { isFavorite, toggleFavorite } = useFavorites();

    const debouncedQuery = useDebounce(query, 500);

    const performSearch = async (searchTerm, pageNumber = 1) => {
        if (!searchTerm) {
            setMovies([]);
            setTotalResults(0);
            return;
        }
        setSearchLoading(true);
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
            console.error('Search error', err);
        } finally {
            setSearchLoading(false);
        }
    };

    // Trigger search when query OR page changes
    useEffect(() => {
        performSearch(debouncedQuery, page);
    }, [debouncedQuery, page]);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setPage(1); // Reset to first page on new search
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            <SearchBar onSearch={handleSearch} />

            {searchLoading ? (
                <div className="status-container">
                    <p>Searching for movies...</p>
                </div>
            ) : (
                <>
                    <MovieList
                        movies={movies}
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                        emptyMessage={query ? `No movies found for "${query}"` : "Start searching for your favorite movies!"}
                    />

                    {movies.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalResults={totalResults}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
