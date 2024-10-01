import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../ormconfig";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      username: username,
    },
  });
  if (user) {
    console.log(bcrypt.compareSync(password, user.password));
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
      },
      "meu_segredo_mais_importante",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: username.email,
          role: user.role,
        },
        jwt: token,
      },
    });
  } else {
    res.status(401).json({
      status: 401,
      name: "Authorization Error",
      message: "Username or Password invalid",
    });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json({
    data: {
      message: "Logout realized with sucess",
    },
  });
});

router.post("/register", async (req, res) => {
  const { name, username, email, password, role } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      username: username,
    },
  });

  if (user) {
    res.status(409).json({
      status: 409,
      name: "Conflict",
      message: "Username already exists",
    });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = userRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });
    await userRepository.save(newUser);

    res.status(201).json({
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  }
});
export default router;
