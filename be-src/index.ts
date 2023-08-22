import * as express from "express";
import * as path from "path";
import * as cors from "cors";

import { UserController } from "./controllers/user";
import { AuthController } from "./controllers/auth";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/test", (req, res) => {
  res.send("endpoint working");
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
