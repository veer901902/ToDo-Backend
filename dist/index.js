"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ToDoRoutes_1 = __importDefault(require("./routes/ToDoRoutes"));
const ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
const app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/user", userRoutes_1.default);
app.use("/api/todo", ToDoRoutes_1.default);
app.use(ErrorMiddleware_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
