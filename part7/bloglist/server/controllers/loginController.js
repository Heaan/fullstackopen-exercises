const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('@util/config');
const User = require('@models/user');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  let passwordCorrect = false;
  if (user !== null) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  }

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: 'invalid username or password' });
    return;
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
};

module.exports = { login };
