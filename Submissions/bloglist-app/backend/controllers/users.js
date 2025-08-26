const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  console.log(users);
  response.status(200).json(users);
});

userRouter.get('/:id', async (request, response) => {
  const user = await User.find({id: request.body.id})
  console.log('found user: ', user)
  response.status(200).json(user)
})

userRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.password.length < 3 || body.password === undefined) {
    return response.status(400).end();
  }
  const passHash = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    username: body.username,
    passwordHash: passHash,
    name: body.name,
  });

  response.status(201).json(await newUser.save());
});

module.exports = userRouter;
