export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

//ssn i dateOfBirth = optional ???
export type Patient = {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
};

export type SanitizedPatiend = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;