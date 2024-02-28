import express from "express";
import createTodo from "../controllers/createTodo";
import authMiddleware from "../middlewares/AuthMiddleware";
import updateTodo from "../controllers/updateTodo";
import deleteTodo from "../controllers/deleteTodo";

const router = express.Router();

router.post("/createTodo", authMiddleware, createTodo);
router.post("/updateTodo", authMiddleware, updateTodo);
router.post("/deleteTodo", authMiddleware, deleteTodo);

export default router;