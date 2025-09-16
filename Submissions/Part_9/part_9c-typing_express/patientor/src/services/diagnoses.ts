import axios from "axios";
import { Diagnosis } from "../types";
import {apiBaseUrl} from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  console.log('DATA: ', data);
  return data;
};

const getCodes = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  const codes = data.map(d => d.code);
  console.log('DIAGNOSIS CODES: ', codes);
  return codes;
};

export default {
  getAll,
  getCodes,
};