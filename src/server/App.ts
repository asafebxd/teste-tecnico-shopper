import express from "express";
import "dotenv/config";
import { router } from "../routes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(router);

export { app };
