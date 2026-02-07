import { useState, useEffect } from 'react';
import movieService from '../services/movieService';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    // Use our custom debounce hook
    const debouncedQuery = useDebounce(query, 500);

    const performSearch = async (searchTerm) => {
        if (!searchTerm) {
            setMovies([]);
            return;
        }
        setSearchLoading(true);
        try {
            const data = await movieService.searchMovies(searchTerm);
            if (data.movies) {
                setMovies(data.movies);
            } else {
                setMovies([]);
            }
        } catch (err) {
            console.error('Search error', err);
        } finally {
            setSearchLoading(false);
        }
    };

    // Trigger search when the debounced value changes
    useEffect(() => {
        performSearch(debouncedQuery);
    }, [debouncedQuery]);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            {searchLoading && (
                <div className="status-container">
                    <p>Searching for movies...</p>
                </div>
            )}

            <div className="movie-grid">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFavorite(movie.imdbID)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))
                ) : (
                    !searchLoading && query && (
                        <div className="status-container">
                            <p>No movies found for "{query}"</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
