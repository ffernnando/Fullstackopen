import axios from 'axios';
import { type DiaryEntry, type NewDiaryEntry } from '../types';

const baseRoute = 'http://localhost:3000/api/diaries';

const createEntry = async (newEntry: NewDiaryEntry) => {
  try {
    const res = await axios.post<DiaryEntry>(baseRoute, newEntry);
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Backend error: ', error.response.data);
        throw new Error(error.response.data)
      } else {
        console.error('Axios error without response: ', error.message);
        throw new Error('Network error or no response');
      }
    } else {
      console.error('Unknown error: ', error);
      throw new Error('Unexpected error');
    }
  }

  /*return axios
    .post<DiaryEntry>(baseRoute, newEntry)
    .then(response => response.data); */
};

const getAll = () => {
  console.log('getting all()');
  const data = axios
    .get<DiaryEntry[]>(baseRoute)
    .then(response => response.data);
  console.log('data: ', data);
  return data;
}

export { getAll, createEntry }