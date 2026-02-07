import { useState, useEffect } from 'react';
import movieService from '../services/movieService';
import { useFavorites } from '../hooks/useFavorites';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

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

    useEffect(() => {
        performSearch(debouncedQuery);
    }, [debouncedQuery]);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <div className="home-page">
            <SearchBar onSearch={handleSearch} />

            {searchLoading ? (
                <div className="status-container">
                    <p>Searching for movies...</p>
                </div>
            ) : (
                <MovieList
                    movies={movies}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    emptyMessage={query ? `No movies found for "${query}"` : "Start searching for your favorite movies!"}
                />
            )}
        </div>
    );
};

export default Home;
