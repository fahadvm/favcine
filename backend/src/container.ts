import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types/di.types";


import { IMovieService } from "./interfaces/IMovieService";
import { IFavoriteStore } from "./interfaces/IFavoriteStore";
import { IFavoriteService } from "./interfaces/IFavoriteService";


import { OmdbService } from "./services/OmdbService";
import { FavoriteService } from "./services/FavoriteService";


import { FavoritesFileStore } from "./utils/FavoritesFileStore";


import { MovieController } from "./controllers/MovieController";
import { FavoriteController } from "./controllers/FavoriteController";
import { IMovieController } from "./interfaces/IMovieController";
import { IFavoriteController } from "./interfaces/IFavoriteController";

const container = new Container();


container.bind<IMovieService>(TYPES.IMovieService).to(OmdbService).inSingletonScope();
container.bind<IFavoriteStore>(TYPES.IFavoriteStore).to(FavoritesFileStore).inSingletonScope();
container.bind<IFavoriteService>(TYPES.IFavoriteService).to(FavoriteService).inSingletonScope();
container.bind<IMovieController>(TYPES.IMovieController).to(MovieController).inSingletonScope();
container.bind<IFavoriteController>(TYPES.IFavoriteController).to(FavoriteController).inSingletonScope();

export { container };
