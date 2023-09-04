import { Router } from "express";

import { PetController } from "../controllers/pet";

import { verifyJwtToken } from "../middlewares/authJwt";

import { submitImgCloudinary } from "../utilities";

export const petsRouter = Router();

petsRouter.get("/", async (req, res) => {
  res.status(200).json(await PetController.getAllPets());
});

petsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(req.socket.remoteAddress, "ip");

  const searchedPet = await PetController.getById(parseInt(id));

  if (!searchedPet)
    return res.status(400).json({ message: "Searched pet doesn't exist" });

  res.status(200).json(searchedPet);
});

petsRouter.get("/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;

  // const nearbyPets = await PetController.getNearbyPets(lat, lng);
  const nearbyPets = await PetController.getNearbyPetsWithIP();

  res.json(nearbyPets);
});

petsRouter.post("/", verifyJwtToken, async (req, res) => {
  if (req.body.name && req.body.imgURL && req.body.lat && req.body.lng) {
    // req.body.imgURL = (await submitImgCloudinary(req.body.imgURL)).secure_url;
    req.body.imgURL = "https://picsum.photos/200/300"; // MOCK
    req.body.userId = req["_user"].id;

    const newPet = await PetController.create(req.body);

    if (!newPet) return res.status(500).json("error while creation the pet");

    res.status(201).json(newPet);
  } else {
    res.status(400).json("falta data");
  }
});
