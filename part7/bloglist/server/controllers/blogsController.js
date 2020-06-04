/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const config = require('@util/config');
const Blog = require('@models/blog');
const User = require('@models/user');

const getAll = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate('comments', { content: 1 });
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
};

const update = async (req, res) => {
  const { likes } = req.body;
  const { id } = req.params;

  const blog = await Blog.findByIdAndUpdate(id, { likes }, { new: true }).populate('user', {
    username: 1,
    name: 1,
  });
  if (blog) {
    res.status(201).json(blog.toJSON());
  } else {
    res.status(404).end();
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const { token } = req;
  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findById(decoded.id);

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).end();
    return;
  }
  if (blog.user.toString() !== user._id.toString()) {
    res.status(403).json({ error: 'unmatched user id' });
    return;
  }
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
};

const create = async (req, res) => {
  const { body } = req;
  if (body.likes === undefined) {
    body.likes = 0;
  }
  const { token } = req;
  // invalid token: throw the error before assigning `decodedToken`
  const decoded = jwt.verify(token, config.SECRET);

  const user = await User.findById(decoded.id);

  const newBlog = new Blog({ ...body, user: user._id });
  const blog = await newBlog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  const createdBlog = await Blog.findOne(blog).populate('user', { username: 1, name: 1 });

  res.status(201).json(createdBlog.toJSON());
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
};
