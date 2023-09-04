import { Router } from "express";

import { PetController } from "../controllers/pet";

import { verifyJwtToken } from "../middlewares/authJwt";

import { submitImgCloudinary } from "../utilities";

export const petsRouter = Router();

petsRouter.get("/", async (req, res) => {
  res.status(200).json(await PetController.getAllPets());
});

petsRouter.get("/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;

  // const nearbyPets = await PetController.getNearbyPets(lat, lng);
  const nearbyPets = await PetController.getNearbyPetsWithIP();

  res.json(nearbyPets);
});

petsRouter.post("/", verifyJwtToken, async (req, res) => {
  console.log("llegue");

  if (req.body.name && req.body.imgURL && req.body.lat && req.body.lng) {
    req.body.imgURL = (await submitImgCloudinary(req.body.imgURL)).secure_url;

    const newPet = await PetController.create(req.body);

    if (!newPet) return res.status(500).json("error while creation the pet");

    res.status(201).json(newPet);
  } else {
    res.status(400).json("falta data");
  }
});
