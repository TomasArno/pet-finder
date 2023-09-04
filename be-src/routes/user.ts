import { Router } from "express";

import { AuthController } from "../controllers/auth";
import { UserController } from "../controllers/user";

import { verifyJwtToken } from "../middlewares/authJwt";
import { getSHA256 } from "../utilities";

export const usersRouter = Router();

//guardar en auth solo id y pass y cuando deshasheo el jwt y saco el id ahi puedo acceder a la tabla auth

usersRouter.post("/signup", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const userExist = await UserController.getUserByEmail(email);

    if (userExist)
      return res.status(400).json({ message: "Email already in use" });

    const userRecord = await UserController.newUser(email);
    const authRecord = await AuthController.newAuth({
      email,
      password: getSHA256(password),
      userRecord,
    });

    if (!authRecord)
      return res.status(500).json({ message: "Something went wrong" });

    const token = AuthController.createJwtToken(authRecord);

    res.status(201).json({ token });
  } else {
    res.status(400).json({ message: "Missing information" });
  }
});

usersRouter.post("/login", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const userExist = await UserController.getUserByEmail(email);
    if (!userExist)
      return res.status(404).json({ message: "Email not registered" });

    const authRecord = await AuthController.getAuth({
      email,
      password: getSHA256(password),
    });

    if (!authRecord)
      return res.status(400).json({ message: "Incorrect password" });

    const token = AuthController.createJwtToken(authRecord);

    res.status(200).json({ token });
  } else {
    res.status(400).json({ message: "Missing information" });
  }
});

usersRouter.get("/test", verifyJwtToken, async (req, res) => {
  res
    .status(200)
    .json([await UserController.getAll(), await AuthController.getAll()]);
});

usersRouter.get("/me", verifyJwtToken, async (req, res) => {
  const user = await UserController.getUserById(req["_user"].id);

  if (!user) return res.status(400).json({ message: "User Not Found" });

  res.status(200).json({ userId: user.dataValues.id });
});

usersRouter.put("/:userId", verifyJwtToken, async (req, res) => {
  const { userId } = req.params;

  if (req.body && req.body.oldPassword && req.body.newPassword) {
    const { newPassword, oldPassword } = req.body;

    const [affectedUsers] = await AuthController.changeCredentials(
      {
        oldPassword: getSHA256(oldPassword),
        newPassword: getSHA256(newPassword),
      },
      userId
    );

    affectedUsers
      ? res.status(200).json({ message: "Modified credentials" })
      : res.status(404).json({ message: "Not found" });
  }
});
