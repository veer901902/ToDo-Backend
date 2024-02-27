import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/ToDoRoutes";

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("api/user", userRouter);
app.use("api/todo", todoRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
