import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/ToDoRoutes";
import errorMiddleware from "./middlewares/ErrorMiddleware";

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
