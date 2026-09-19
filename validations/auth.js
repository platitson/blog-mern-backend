import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format.").isEmail(),
  body("password", "The password must contain at least 5 characters.").isLength(
    { min: 5 }
  ),
  body("fullName", "Very short name").isLength({ min: 3 }),
  body("avatarURL", "Wrong avatar URL").optional().isURL(),
];
