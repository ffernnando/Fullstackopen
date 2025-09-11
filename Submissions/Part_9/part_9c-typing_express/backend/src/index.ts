import express from 'express';
import diagnosisRouter from './routes/diagnoses_routes';
import patientRouter from './routes/patients_routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('Endpoint /api/ping pinged!');
  res.send('pong');
});

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});