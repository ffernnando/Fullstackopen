import axios from "axios";
import { Entry, EntryFormData, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  console.log('DATA: ', data);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const findPatient = async (id: string | undefined) => {
  if (typeof id === 'undefined') {
    return undefined;
  }
  const { data } = await axios.get<Patient | undefined>(`${apiBaseUrl}/patients/${id}`);
  console.log('FOUND PATIENT: ', data);
  return data;
};

const createEntry = async (patientId: string, entryData: EntryFormData) => {
  if (entryData) {
    const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`);
    console.log('ENTRY ADDED: ', data);
    return data;
  } 
};

export default {
  getAll, create, findPatient, createEntry
};

