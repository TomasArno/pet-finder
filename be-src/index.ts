import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as jwt from "jsonwebtoken";

import { UserController } from "./controllers/user";
import { AuthController } from "./controllers/auth";
import { PetController } from "./controllers/pet";

// import { sequelize } from "./conn";
// sequelize.sync({ force: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("dist"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY_JWT;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_KEY);
      req._user = data;

      next();
    } catch {
      res.status(401).json({ error: "invalid token" });
    }
  } else {
    res.status(401).json({ error: "invalid token" });
  }
};

app.get("/nearby-pets", async (req, res) => {
  // const { lat, lng } = req.query;

  // const nearbyPets = await PetController.getNearbyPets(lat, lng);
  const nearbyPets = await PetController.getNearbyPetsWithIP();

  res.json(nearbyPets);
});

app.get("/pets", authMiddleware, async (req, res) => {
  res.json(await PetController.getAllPets());
});

app.post("/pets", authMiddleware, async (req, res) => {
  if (req.body.name && req.body.area && req.body.lat && req.body.lng) {
    const newPet = await PetController.newLostPet(req.body);

    res.json(newPet);
  } else {
    res.json("falta data");
  }
});

app.post("/users", async (req, res) => {});

app.post("/auth", async (req, res) => {
  const { email, password, fullname } = req.body;

  const [userRecord, created] = await UserController.newUser({
    email,
    fullname,
  });

  const [authRecord, createdAuth] = await AuthController.newAuth({
    userRecord,
    email,
    password,
  });

  res.json({ authRecord });
});

app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;

  const authRecord = await AuthController.getAuth({
    email,
    password,
  });

  if (authRecord) {
    const token = AuthController.createToken(authRecord);
    res.json(token);
  } else {
    res.json("invalid credentials");
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  const user = await UserController.getUser(req["_user"].id);

  res.json(user);
});

app.get("/me/pets", authMiddleware, async (req, res) => {
  const userPets = await PetController.getMyPets(req["_user"].id);

  res.json(userPets);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
);

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
