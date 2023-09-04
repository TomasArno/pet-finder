import * as express from "express";
import * as path from "path";

import { usersRouter } from "./routes/user";
import { petsRouter } from "./routes/pet";

// APP INITIALIZATION

export const app = express();

// MIDDLEWARES

app.use(express.static("dist"));
app.use(express.json({ limit: "50mb" }));

// ROUTES

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

// STATIC SERVER

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
);
