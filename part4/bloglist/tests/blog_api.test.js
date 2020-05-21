const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObj = initBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArr);
});

test('the correct amount of blogs are returned in the JSON format ', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(res.body).toHaveLength(initBlogs.length);
});

test('the unique identifier property of the blogs is named "id", not "_id"', async () => {
  const blogs = await Blog.find({});
  const blog = blogs.map((b) => b.toJSON())[0];

  expect(blog.id).toBeDefined();
  // eslint-disable-next-line no-underscore-dangle
  expect(blog._id).not.toBeDefined();
});

test('a new blog post is created', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await Blog.find({});
  const blogsAtEnd = blogs.map((b) => b.toJSON());

  expect(blogsAtEnd).toHaveLength(initBlogs.length + 1);

  const blog = blogsAtEnd[initBlogs.length];
  newBlog.id = blog.id;

  expect(blog).toEqual(newBlog);
});

test('missing likes property of the blog default to 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  const res = await api.post('/api/blogs').send(newBlog);
  const retBlog = res.body;

  expect(retBlog.likes).toBeDefined();
  expect(retBlog.likes).toBe(0);
});

test('the response to creating a blog with missing attributes is 400', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
