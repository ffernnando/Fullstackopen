import express from 'express';
import { validateAndCalculate } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmi: string = validateAndCalculate([String(req.query.height), String(req.query.weight)]);
    res.status(200);
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmi
    })
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
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});