const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

const initBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const initUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: '8day1fdds',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'Ldd03sd2J',
  },
];

const blogInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const userInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const hashFrom = (user) => {
  const { password } = user;
  // eslint-disable-next-line no-param-reassign
  delete user.password;
  const saltRounds = 6;
  // const passwordHash = await bcrypt.hash(password, saltRounds);
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  const ret = { ...user, passwordHash };
  return ret;
};

const getToken = (user) => {
  const { username, _id } = user;
  const token = jwt.sign({ username, id: _id }, config.SECRET);
  return token;
};

module.exports = {
  initBlogs,
  initUsers,
  blogInDB,
  userInDB,
  hashFrom,
  getToken,
};
