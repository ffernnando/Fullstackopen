import express from 'express';
import { validateAndCalculate } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmi: string = validateAndCalculate([req.query.height as string, req.query.weight as string]);
    res.status(200);
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmi
    });
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400);
    res.send({
      error: errorMessage
    });
  }
  
});

app.post('/exercises', (req, res) => {
  interface request {
    daily_exercises: string[];
    target: string;
  }

  try {
    const { daily_exercises, target } = req.body as request;
    const exercisesNumbers: number[] = [];

    if (!daily_exercises || !target) {
      throw new Error('malformatted parameters');
    }

    daily_exercises.forEach(e => {
      if (isNaN(Number(e))) {
        throw new Error('wrong parametre type');
      }
      exercisesNumbers.push(Number(e));
    });

    if (isNaN(Number(target))) {
      throw new Error('wrong parametre type');
    }

    const result = calculateExercises(exercisesNumbers, Number(target));
    console.log('result: ', result);
    res.status(200);
    res.send(result);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log('errorMessage: ', errorMessage);
    res.status(400);
    res.send({
      error: errorMessage
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});