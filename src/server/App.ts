import express from "express";
import "dotenv/config";
import { routes } from "../routes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(routes);

export { app };
