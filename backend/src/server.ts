import "reflect-metadata";
import app from './app';
import config from './config/index';

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
