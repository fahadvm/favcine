require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const FAVORITES_FILE = path.join(__dirname, 'data', 'favorites.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ensure favorites file exists
const initStorage = async () => {
  try {
    await fs.ensureFile(FAVORITES_FILE);
    const content = await fs.readFile(FAVORITES_FILE, 'utf8');
    if (!content) {
      await fs.writeJson(FAVORITES_FILE, []);
    }
  } catch (err) {
    console.error('Error initializing storage:', err);
  }
};
initStorage();

// OMDB API Search Proxy
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const apiKey = process.env.OMDB_API_KEY;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: apiKey,
        s: query
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('OMDB Search Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies from OMDB' });
  }
});

// Get Favorites
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await fs.readJson(FAVORITES_FILE);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read favorites' });
  }
});

// Add Favorite
app.post('/api/favorites', async (req, res) => {
  const movie = req.body;
  if (!movie || !movie.imdbID) {
    return res.status(400).json({ error: 'Invalid movie data' });
  }

  try {
    const favorites = await fs.readJson(FAVORITES_FILE);
    // Check if already exists
    if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
      return res.status(400).json({ error: 'Movie already in favorites' });
    }
    favorites.push(movie);
    await fs.writeJson(FAVORITES_FILE, favorites, { spaces: 2 });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// Remove Favorite
app.delete('/api/favorites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let favorites = await fs.readJson(FAVORITES_FILE);
    favorites = favorites.filter(fav => fav.imdbID !== id);
    await fs.writeJson(FAVORITES_FILE, favorites, { spaces: 2 });
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
