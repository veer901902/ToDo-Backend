import express from "express";
import registerUser from "../controllers/registerUser";
import authUser from "../controllers/authUser";

const router = express.Router();

router.post("/register", registerUser);
router.post('/login', authUser);

export default router;
