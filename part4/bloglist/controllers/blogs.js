/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 });
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;
  const { id } = req.params;

  const blog = await Blog.findByIdAndUpdate(id, { likes }, { new: true });
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

blogsRouter.post('/', async (req, res) => {
  const { body } = req;
  if (body.likes === undefined) {
    body.likes = 0;
  }

  const user = await User.findById(body.userId);

  const newBlog = new Blog({ ...body, user: user._id });
  const blog = await newBlog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  res.status(201).json(blog.toJSON());
});

module.exports = blogsRouter;
