/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('useFindAndModify', false);

const app = express();

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    unique: true,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

const { MONGO_URL } = process.env;
console.log('connecting to MongoDB');
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.log('error connection to MongoDB', err.message);
  });

app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method);
  console.log('Path: ', req.path);
  console.log('Body: ', req.body);
  console.log('----');
  next();
};
app.use(requestLogger);

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs.map((blog) => blog.toJSON())));
});

app.get('/api/blogs/:id', (req, res, next) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => blog.toJSON())
    .then((foundBlog) => {
      if (foundBlog) {
        res.json(foundBlog);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.put('/api/blogs/:id', (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  const newBlog = {
    likes: body.likes,
  };
  Blog.findByIdAndUpdate(id, newBlog, { new: true })
    .then((blog) => blog.toJSON())
    .then((blog) => res.json(blog))
    .catch((err) => next(err));
});

app.delete('/api/blogs/:id', (req, res, next) => {
  const { id } = req.params;
  Blog.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post('/api/blogs', (req, res, next) => {
  const { body } = req;
  const newBlog = new Blog(body);
  newBlog
    .save()
    .then((blog) => blog.toJSON())
    .then((blog) => res.status(201).json(blog))
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).send({ error: 'malformatted id' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }
  next(err);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
