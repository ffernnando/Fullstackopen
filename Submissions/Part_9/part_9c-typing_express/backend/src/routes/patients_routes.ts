import express, { Response } from 'express';
import { addPatient, findPatient, getPatients } from '../services/patientServices';
import { SanitizedPatiend } from '../types';
import { NewPatientSchema } from '../utils';
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

/*
  name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop"

*/

export default router;