import express, { Response } from 'express';
const router = express.Router();

import { getDiagnoses } from '../services/diagnosesServices';
import { Diagnosis } from '../types';

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('fetching diagnoses');
  res.send(getDiagnoses());
});


export default router;



/* import express, { Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router; */