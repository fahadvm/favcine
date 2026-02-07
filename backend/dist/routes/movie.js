"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const di_types_1 = require("../types/di.types");
const container_1 = require("../container");
const router = (0, express_1.Router)();
// Resolve Controller from Container
const movieController = container_1.container.get(di_types_1.TYPES.MovieController);
router.get('/search', movieController.searchMovies);
exports.default = router;
