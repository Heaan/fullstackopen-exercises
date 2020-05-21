const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
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

  const newBlog = new Blog(body);
  const blog = await newBlog.save();
  res.status(201).json(blog.toJSON());
});

module.exports = blogsRouter;
