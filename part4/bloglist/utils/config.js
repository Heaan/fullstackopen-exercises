require('dotenv').config();

const { PORT } = process.env;
let { MONGO_URI } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGO_URI;
}

module.exports = { PORT, MONGO_URI };
