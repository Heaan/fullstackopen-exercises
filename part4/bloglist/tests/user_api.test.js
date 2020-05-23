const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});

  const usersObj = helper.initUsers.map((user) => new User(helper.hashFrom(user)));
  const promiseArr = usersObj.map((user) => user.save());
  await Promise.all(promiseArr);
});

describe('when an invalid user information is submitted for registration', () => {
  test('users with repeated `username` cannot be created', async () => {
    const usersAtStart = await helper.userInDB();

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: '8day1fdds',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.text).toContain('username: Error, expected `username` to be unique');
      });

    const usersAtEnd = await helper.userInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('users without `username` cannot be created', async () => {
    const usersAtStart = await helper.userInDB();

    const newUser = {
      name: 'Arto Hellas',
      password: '8day1fdds',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.text).toContain('`username` is required');
      });

    const usersAtEnd = await helper.userInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('users without `password` cannot be created', async () => {
    const usersAtStart = await helper.userInDB();

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.text).toContain('invalid password');
      });

    const usersAtEnd = await helper.userInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('users with `password` less than 3 characters cannot be created', async () => {
    const usersAtStart = await helper.userInDB();

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: '8d',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.text).toContain('invalid password');
      });

    const usersAtEnd = await helper.userInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('users with `username` less than 3 characters cannot be created', async () => {
    const usersAtStart = await helper.userInDB();

    const newUser = {
      username: 'he',
      name: 'Arto Hellas',
      password: '8day1fdds',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.text).toContain('shorter than the minimum allowed length');
      });

    const usersAtEnd = await helper.userInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
