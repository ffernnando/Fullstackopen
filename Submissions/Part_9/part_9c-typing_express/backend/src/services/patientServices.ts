import patientData from "../../data/patients";
import { Entry, EntryWithoutId, NewPatient, Patient, SanitizedPatiend } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): SanitizedPatiend[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  
  patientData.push(newPatient);
  return newPatient;
};

const findPatient = (id: string): Patient | undefined=> {
  const foundPatient = patientData.find(p => p.id === id);
  console.log('foundPatient: ', foundPatient);
  return foundPatient;
};



const addEntry = (patientId: string, entryData: EntryWithoutId): Entry => {
  const patient = patientData.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('No patient with given id found');
  }

  const entry = {
    id: uuid(),
    ...entryData
  };
  patient.entries = patient.entries?.concat(entry) ?? [entry];

  return entry;
};

export {
  getPatients,
  addPatient,
  findPatient,
  addEntry
};