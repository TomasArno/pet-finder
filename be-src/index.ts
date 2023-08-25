import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as crypto from "crypto";

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

const getSHA256 = (input: string): string => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const data = AuthController.verifyToken(token);

    if (data) {
      req._user = data;

      next();
    } else {
      res.status(401).json({ error: "invalid token" });
    }
  } else {
    res.status(401).json({ error: "invalid token" });
  }
};

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

app.get("/test", async (req, res) => {
  res.json([await UserController.getAll(), await AuthController.getAll()]);
});

app.post("/login", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const authRecord = await AuthController.getAuth({
      email,
      password: getSHA256(password),
    });

    if (authRecord) {
      const token = AuthController.createToken(authRecord);

      res.status(200).json({ token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "es necesario email y contraseña" });
  }
});

app.post("/signup", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const userRecord = await UserController.newUser(email);

    const authRecord = await AuthController.newAuth({
      email,
      password: getSHA256(password),
      userRecord,
    });

    if (authRecord) {
      const token = AuthController.createToken(authRecord);

      res.status(201).json({ token });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(400).json({ message: "es necesario email y contraseña" });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  const user = await UserController.getUser(req["_user"].id);

  res.json(user);
});

// app.get("/me/pets", authMiddleware, async (req, res) => {
//   const userPets = await PetController.getMyPets(req["_user"].id);

//   res.json(userPets);
// });

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
);

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
