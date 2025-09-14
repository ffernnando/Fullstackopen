import { z } from 'zod';
import { NewPatientSchema } from './utils';

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

export interface Entry {
  id: string | undefined
}

//ssn i dateOfBirth = optional ???
export interface Patient extends NewPatient{
  id: string,
  entries: Entry[];
};

export type SanitizedPatiend = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;