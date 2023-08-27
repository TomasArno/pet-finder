import * as express from "express";
import * as path from "path";
import * as cors from "cors";

import { usersRouter } from "./routes/user";

export const app = express();

app.use(express.static("dist"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// app.get("/nearby-pets", async (req, res) => {
//   // const { lat, lng } = req.query;

//   // const nearbyPets = await PetController.getNearbyPets(lat, lng);
//   const nearbyPets = await PetController.getNearbyPetsWithIP();

//   res.json(nearbyPets);
// });

// app.get("users/:userId/pets", authMiddleware, async (req, res) => {
//   res.json(await PetController.getAllPets());
// });

// app.post("/pets", authMiddleware, async (req, res) => {
//   if (req.body.name && req.body.area && req.body.lat && req.body.lng) {
//     const newPet = await PetController.newLostPet(req.body);

//     res.json(newPet);
//   } else {
//     res.json("falta data");
//   }
// });

app.use("/api/users", usersRouter);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
);
