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

//ssn i dateOfBirth = optional ???
export interface Patient extends NewPatient{
  id: string;
};

export type SanitizedPatiend = Omit<Patient, 'ssn'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;