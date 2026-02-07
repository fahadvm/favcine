import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface Config {
    PORT: string | number;
    OMDB_API_KEY: string;
    FAVORITES_FILE: string;
}

const config: Config = {
    PORT: process.env.PORT || 5000,
    OMDB_API_KEY: process.env.OMDB_API_KEY || '',
    FAVORITES_FILE: process.env.FAVORITES_FILE || path.join(process.cwd(), 'src/data/favorites.json')
};

if (!config.OMDB_API_KEY) {
    console.warn('WARNING: OMDB_API_KEY is not defined in environment variables');
}

export default config;
