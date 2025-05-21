import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import schoolMngRoute from "./routes/schoolMng.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());

app.use("/api/school", schoolMngRoute);

app.get("/", (req, res) => {
  res.send("Assignment Completed!");
});

export default app;
