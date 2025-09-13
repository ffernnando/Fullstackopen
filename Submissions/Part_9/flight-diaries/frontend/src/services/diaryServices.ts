import axios from 'axios';
import { type DiaryEntry, type NewDiaryEntry } from '../types';

const baseRoute = 'http://localhost:3000/api/diaries';

const createEntry = (newEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseRoute, newEntry)
    .then(response => response.data);
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