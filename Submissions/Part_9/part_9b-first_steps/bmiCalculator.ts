
export const validateAndCalculate = (args: string[]) => {
  console.log('height: ', args[0], ' | weight: ', args[1]);
  if (args[0] === 'undefined' || args[1] === 'undefined') {
    console.log('this is happening');
    throw new Error('Incomplete parameters!');
  }
  
  const { height, weight } = validateInputs(['', '', ...args]);
  return calculateBmi(height, weight);  
};

const validateInputs = (args: string[]) => {
  if (args.length !== 4) {
    throw new Error('Invalid input argument count!');
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('At least one of the arguments is of an invalid type!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  
  const bmi: number = weight / (Math.pow(height/100, 2));
  console.log('bmi: ', bmi);
  let status: string;
  if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    status = 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }
  return status;
};

if (require.main === module) {
  try {
    const { height, weight } = validateInputs(process.argv);
    console.log('BMI status: ', calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}


