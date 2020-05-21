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

afterAll(() => {
  mongoose.connection.close();
});
