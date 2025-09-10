import express, { Response } from 'express';
import { getPatients } from '../services/patientServices';
import { SanitizedPatiend } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<SanitizedPatiend[]>) => {
  console.log('Fetching patients!');
  res.send(getPatients());
});

export default router;