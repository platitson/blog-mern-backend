import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World!");
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
