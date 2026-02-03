import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    FAVORITES_FILE: process.env.FAVORITES_FILE || './src/data/favorites.json'
};

export default config;
