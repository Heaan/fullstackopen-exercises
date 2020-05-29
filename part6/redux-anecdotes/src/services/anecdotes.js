import Axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await Axios.get(baseUrl);
  return res.data;
};

export default { getAll };
