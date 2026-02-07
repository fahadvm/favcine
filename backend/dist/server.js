"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const PORT = index_1.default.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
