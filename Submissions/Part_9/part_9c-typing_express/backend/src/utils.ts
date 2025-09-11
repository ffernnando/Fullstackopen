import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Name missing or of wrong type');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Occupation missing or of wrong type');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('SSN missing or of wrong type');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender missing or of wrong type');
  }
  return gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Date of birth missing or of wrong type');
  }
  return dateOfBirth;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof(object) !== 'object') {
    throw new Error('Wrong object type');
  }
  if ('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object && 'ssn' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn)
    };
    return newPatient;
  }
  throw new Error('Missing fields');
};

export default toNewPatient;