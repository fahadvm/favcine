import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { searchMovies, getFavorites, addFavorite, removeFavorite } from '../api';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const { data } = await getFavorites();
            setFavorites(data);
        } catch (err) {
            console.error('Error fetching favorites', err);
        }
    };

    const performSearch = async (searchTerm) => {
        if (!searchTerm) {
            setMovies([]);
            return;
        }
        setLoading(true);
        try {
            const { data } = await searchMovies(searchTerm);
            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (err) {
            console.error('Search error', err);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((nextValue) => performSearch(nextValue), 500),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const toggleFavorite = async (movie) => {
        const isFav = favorites.find(fav => fav.imdbID === movie.imdbID);
        try {
            if (isFav) {
                await removeFavorite(movie.imdbID);
                setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
            } else {
                await addFavorite(movie);
                setFavorites([...favorites, movie]);
            }
        } catch (err) {
            console.error('Toggle favorite error', err);
        }
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

            {loading && <p>Loading...</p>}

            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        isFavorite={!!favorites.find(fav => fav.imdbID === movie.imdbID)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>

            {!loading && query && movies.length === 0 && (
                <p>No movies found for "{query}"</p>
            )}
        </div>
    );
};

export default Home;
