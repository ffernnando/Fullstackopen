import patientData from "../../data/patients";
import { SanitizedPatiend } from "../types";

const getPatients = (): SanitizedPatiend[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export {
  getPatients
};