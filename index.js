import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json(errors.array());
    }

    const password = request.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: request.body.email,
      fullName: request.body.fullName,
      avatarUrl: request.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    response.json(user);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to register user",
    });
  }
});

app.post("/auth/login", (request, response) => {
  const token = jwt.sign(
    { email: request.body.email, fullName: "John Doe" },
    "secret",
    {
      expiresIn: "1h",
    }
  );

  response.json({ success: true, token });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
