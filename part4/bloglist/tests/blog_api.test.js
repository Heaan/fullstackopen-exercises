/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

// beforeAll(async () => {
//   await User.deleteMany({});
//   const user = helper.initUsers[0];
//   const usersObj = new User(helper.hashFrom(user));
//   await usersObj.save();
// });
beforeAll(async () => {
  await User.deleteMany({});

  const usersObj = helper.initUsers.map((user) => new User(helper.hashFrom(user)));
  const promiseArr = usersObj.map((user) => user.save());
  await Promise.all(promiseArr);
});

beforeEach(async () => {
  const user = await User.findOne();
  user.blogs = [];
  await Blog.deleteMany({});

  const blogObj = helper.initBlogs.map((blog) => new Blog({ ...blog, user: user._id }));
  const promiseArr = blogObj.map((blog) => blog.save());
  const blogs = await Promise.all(promiseArr);
  user.blogs = user.blogs.concat(blogs.map((blog) => blog._id));
  await user.save();
});

describe('when there is initially some blogs saved', () => {
  test('the correct amount of blogs are returned in the JSON format ', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toHaveLength(helper.initBlogs.length);
  });

  test('the unique identifier property of the blogs is named "id", not "_id"', async () => {
    const blogs = await helper.blogInDB();
    const blog = blogs[0];

    expect(blog.id).toBeDefined();
    // eslint-disable-next-line no-underscore-dangle
    expect(blog._id).not.toBeDefined();
  });

  test('delete a blog', async () => {
    const user = await User.findOne();
    const token = helper.getToken(user);
    const blogsAtStart = await helper.blogInDB();
    const blog = blogsAtStart[0];

    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).expect(204);

    const blogsAtEnd = await helper.blogInDB();
    expect(blogsAtStart).toContain(blog);
    expect(blogsAtEnd).not.toContain(blog);
  });

  test('like a blog', async () => {
    const blogsAtStart = await helper.blogInDB();
    const blog = blogsAtStart[0];
    const { likes } = blog;

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ likes: likes + 1 })
      .expect(201);

    const blogsAtEnd = await helper.blogInDB();
    const updatedBlog = blogsAtEnd[0];

    expect(updatedBlog.likes).toBe(blog.likes + 1);
  });
});

describe('a new blog is creating', () => {
  test('a new blog is posted', async () => {
    const user = await User.findOne();
    const token = helper.getToken(user);
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogInDB();

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);

    const blog = blogsAtEnd[helper.initBlogs.length];
    newBlog.id = blog.id;
    newBlog.user = user._id;

    expect(blog).toEqual(newBlog);
  });

  test('missing `likes` property', async () => {
    const user = await User.findOne();
    const token = helper.getToken(user);
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    };

    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
    const retBlog = res.body;

    expect(retBlog.likes).toBeDefined();
    expect(retBlog.likes).toBe(0);
  });

  test('without `title` and `url`', async () => {
    const user = await User.findOne();
    const token = helper.getToken(user);
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 2,
    };

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400);
  });

  test('without token', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    };

    await api.post('/api/blogs').send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogInDB();

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
