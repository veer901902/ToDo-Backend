import express from "express";
import createTodo from "../controllers/createTodo";
import authMiddleware from "../middlewares/AuthMiddleware";
import updateTodo from "../controllers/updateTodo";

const router = express.Router();

router.post("/createTodo", authMiddleware, createTodo);
router.post("/updateTodo", authMiddleware, updateTodo);

export default router;