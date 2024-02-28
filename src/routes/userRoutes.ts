import express from "express";
import registerUser from "../controllers/registerUser";
import authUser from "../controllers/authUser";
import getUserToDo from "../controllers/getUserToDo";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/getTodos", authMiddleware, getUserToDo);

export default router;
