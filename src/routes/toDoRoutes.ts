import express from "express";
import createTodo from "../controllers/createTodo";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/createTodo", authMiddleware, createTodo);

export default router;