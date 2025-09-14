import { Gender } from "./types";
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
