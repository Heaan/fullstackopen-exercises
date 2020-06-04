import axios from 'axios';

const setUrl = (id) => `/api/blogs/${id}/comments`;

const getAllIn = async (blog) => {
  const res = await axios.get(setUrl(blog));
  return res.data;
};

const create = async (comment) => {
  const { blog } = comment;
  const res = await axios.post(setUrl(blog), comment);
  return res.data;
};

export default { getAllIn, create };
