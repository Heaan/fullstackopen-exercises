const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        res.json(blog.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogsRouter.put('/:id', (req, res, next) => {
  const { likes } = req.body;
  const { id } = req.params;

  Blog.findByIdAndUpdate(id, { likes }, { new: true })
    .then((blog) => {
      if (blog) {
        res.json(blog.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogsRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Blog.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
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
