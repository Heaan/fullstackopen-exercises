const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// blogsRouter.get('/', (req, res) => {
//   Blog.find({}).then((blogs) => res.json(blogs.map((blog) => blog.toJSON())));
// });
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

blogsRouter.post('/', (req, res, next) => {
  const { body } = req;
  const newBlog = new Blog(body);
  newBlog
    .save()
    .then((blog) => res.status(201).json(blog.toJSON()))
    .catch((err) => next(err));
});

module.exports = blogsRouter;
