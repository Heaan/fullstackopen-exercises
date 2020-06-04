import axios from 'axios';

const setUrl = (id) => `/api/blogs/${id}/comments`;

const getAllIn = async (blogId) => {
  const res = await axios.get(setUrl(blogId));
  return res.data;
};

export default { getAllIn };
