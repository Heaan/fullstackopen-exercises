const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3) {
    res.status(400).json({ error: 'invalid password' });
    return;
  }

  const saltRounds = 8;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser.toJSON());
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
