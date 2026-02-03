const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const movieRoutes = require('./routes/movie.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error Handling
app.use(errorHandler);

module.exports = app;
