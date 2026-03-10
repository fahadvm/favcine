import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types/di.types";


import { IMovieService } from "./interfaces/IMovieService";
import { IFavoriteStore } from "./interfaces/IFavoriteStore";


import { OmdbService } from "./services/OmdbService";
import { FavoriteService } from "./services/FavoriteService";


import { FavoritesFileStore } from "./utils/FavoritesFileStore";


import { MovieController } from "./controllers/MovieController";
import { FavoriteController } from "./controllers/FavoriteController";

const container = new Container();


container.bind<IMovieService>(TYPES.IMovieService).to(OmdbService).inSingletonScope();
container.bind<IFavoriteStore>(TYPES.IFavoriteStore).to(FavoritesFileStore).inSingletonScope();
container.bind<FavoriteService>(TYPES.FavoriteService).to(FavoriteService).inSingletonScope();
container.bind<MovieController>(TYPES.MovieController).to(MovieController).inSingletonScope();
container.bind<FavoriteController>(TYPES.FavoriteController).to(FavoriteController).inSingletonScope();

export { container };
