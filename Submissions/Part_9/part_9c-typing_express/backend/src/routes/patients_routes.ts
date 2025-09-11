import express, { Response } from 'express';
import { addPatient, getPatients } from '../services/patientServices';
import { SanitizedPatiend } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<SanitizedPatiend[]>) => {
  console.log('Fetching patients!');
  res.send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = addPatient(newPatient);
    res.status(200).send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something wrong happened: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
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