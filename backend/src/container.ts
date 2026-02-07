import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types/di.types.js";

// Interfaces
import { IMovieService } from "./interfaces/IMovieService.js";
import { IFavoriteStore } from "./interfaces/IFavoriteStore.js";

// Services
import { OmdbService } from "./services/OmdbService.js";
import { FavoriteService } from "./services/FavoriteService.js";

// Store
import { FavoritesFileStore } from "./utils/FavoritesFileStore.js";

// Controllers
import { MovieController } from "./controllers/MovieController.js";
import { FavoriteController } from "./controllers/FavoriteController.js";

const container = new Container();

// Bindings
container.bind<IMovieService>(TYPES.IMovieService).to(OmdbService).inSingletonScope();
container.bind<IFavoriteStore>(TYPES.IFavoriteStore).to(FavoritesFileStore).inSingletonScope();
container.bind<FavoriteService>(TYPES.FavoriteService).to(FavoriteService).inSingletonScope();
container.bind<MovieController>(TYPES.MovieController).to(MovieController).inSingletonScope();
container.bind<FavoriteController>(TYPES.FavoriteController).to(FavoriteController).inSingletonScope();

export { container };
