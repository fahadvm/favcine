import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types/di.types";

// Interfaces
import { IMovieService } from "./interfaces/IMovieService";
import { IFavoriteStore } from "./interfaces/IFavoriteStore";

// Services
import { OmdbService } from "./services/OmdbService";
import { FavoriteService } from "./services/FavoriteService";

// Store
import { FavoritesFileStore } from "./utils/FavoritesFileStore";

// Controllers
import { MovieController } from "./controllers/MovieController";
import { FavoriteController } from "./controllers/FavoriteController";

const container = new Container();

// Bindings
container.bind<IMovieService>(TYPES.IMovieService).to(OmdbService).inSingletonScope();
container.bind<IFavoriteStore>(TYPES.IFavoriteStore).to(FavoritesFileStore).inSingletonScope();
container.bind<FavoriteService>(TYPES.FavoriteService).to(FavoriteService).inSingletonScope();
container.bind<MovieController>(TYPES.MovieController).to(MovieController).inSingletonScope();
container.bind<FavoriteController>(TYPES.FavoriteController).to(FavoriteController).inSingletonScope();

export { container };
