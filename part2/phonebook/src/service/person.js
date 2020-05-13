import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((res) => res.data);
};

const dele = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (id, personUpdate) => {
  return axios.put(`${baseUrl}/${id}`, personUpdate).then((res) => res.data);
};

export default { getAll, create, dele, update };
