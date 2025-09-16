import { Diagnosis, Gender, HealthCheckRating } from "./types";
import { z } from 'zod';


export const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string()
});

export const PatientSearchSchema = z.object({
  id: z.string()
});


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


export const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};


//Validate baseEntrySchema -> validate diagnosisCodes -> validate specific entry type pased on 'type'

export const TypeSchema = z.object({
  type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"]),
});

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const dischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

export const HCEschema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const OHEschema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickleave: sickLeaveSchema
});

export const HEschema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: dischargeSchema,
});