import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Add post title").isLength({ min: 5 }).isString(),
  body("text", "Add post text").isLength({ min: 10 }).isString(),
  body("tags", "Wrong tags format").optional().isArray(),
  body("imageUrl", "Wrong image URL").optional().isString(),
];
