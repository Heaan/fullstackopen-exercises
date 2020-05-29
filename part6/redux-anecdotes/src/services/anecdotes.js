import Axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await Axios.get(baseUrl);
  return res.data;
};

const create = async (anecdote) => {
  const res = await Axios.post(baseUrl, anecdote);
  return res.data;
};

export default { getAll, create };
