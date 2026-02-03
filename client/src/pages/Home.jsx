import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { movieService } from '../services/api.service';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    const performSearch = async (searchTerm) => {
        if (!searchTerm) {
            setMovies([]);
            return;
        }
        setSearchLoading(true);
        try {
            const { data } = await movieService.search(searchTerm);
            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (err) {
            console.error('Search error', err);
        } finally {
            setSearchLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((nextValue) => performSearch(nextValue), 500),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>

            {searchLoading && <p>Searching...</p>}

            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        isFavorite={isFavorite(movie.imdbID)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>

            {!searchLoading && query && movies.length === 0 && (
                <p>No movies found for "{query}"</p>
            )}
        </div>
    );
};

export default Home;
