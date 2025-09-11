import patientData from "../../data/patients";
import { NewPatient, Patient, SanitizedPatiend } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): SanitizedPatiend[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  
  patientData.push(newPatient);
  return newPatient;
};

export {
  getPatients,
  addPatient
};