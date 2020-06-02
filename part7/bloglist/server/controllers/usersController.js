const bcrypt = require('bcrypt');
const User = require('@models/user');

const getAll = async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users.map((u) => u.toJSON()));
};

const create = async (req, res) => {
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
};

module.exports = { getAll, create };
