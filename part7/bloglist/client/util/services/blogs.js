import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (blog) => {
  const { id } = blog;

  const res = await axios.put(`${baseUrl}/${id}`, blog);
  return res.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
};
