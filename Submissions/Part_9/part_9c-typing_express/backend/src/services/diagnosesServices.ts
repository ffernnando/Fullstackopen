import { Diagnosis } from '../types';
import diagnosisData from '../../data/diagnoses';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

export {
  getDiagnoses
};
