import express, { Response } from 'express';
import { addEntry, addPatient, findPatient, getPatients } from '../services/patientServices';
import {  EntryWithoutId, SanitizedPatiend } from '../types';
import {  HCEschema, HEschema, NewPatientSchema, OHEschema, parseDiagnosisCodes, TypeSchema } from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<SanitizedPatiend[]>) => {
  console.log('Fetching patients!');
  res.send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = addPatient(newPatient);
    res.status(200).send(addedPatient);

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

router.get('/:id', (req, res) => {
  try {
    const id = z.string().parse(req.params.id);
    const patient = findPatient(id);
    if (patient) {
      res.send(patient);
    } else {
      res.status(400).send({ error: 'No user with given ID found' });
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }

});

router.post('/:id/entries', (req, res) => {
  const patientId: string = req.params.id;
  if (!patientId) {
    res.status(400).send({ error: 'Patient ID missing' });
    return;
  }
  try {
    const base = TypeSchema.parse(req.body);
    let entry: EntryWithoutId;
    const diagnosisCodes = parseDiagnosisCodes(req.body);
    switch(base.type) {
      case 'HealthCheck':
        entry = {diagnosisCodes, ...(HCEschema.parse(req.body))};          
        break;
      case 'OccupationalHealthcare':
        entry = {diagnosisCodes, ...(OHEschema.parse(req.body))};
          break;
      case 'Hospital':
        entry = {diagnosisCodes, ...(HEschema.parse(req.body))};
        break;
      default:
        res.status(400).send({ error: 'Something went wrong' });
        return;
    }
    const addedEntry = addEntry(patientId, entry);
    console.log('addedEntry: ', addedEntry);
    res.status(200).send({ addedEntry });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

export default router;