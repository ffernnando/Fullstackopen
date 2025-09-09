interface inputs {
  targetExerciseTime: number;
  dailyExerciseTimes: number[];
}

const parseArguments = (args: string[]): inputs => {
  if (args.length < 4) {
    throw new Error('Too few arguments!');
  }
  const dailyExerciseTimes: number[] = [];
  
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Invalid argument types!');
    }
    if (i > 2) {
      dailyExerciseTimes.push(Number(args[i]));
    }
  }
  const targetExerciseTime: number = Number(args[2]);

  return {
    targetExerciseTime,
    dailyExerciseTimes
  };

};

export const calculateExercises = (dailyTime: number[], targetTime: number) => {
  const totalTime: number = dailyTime.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average: number = totalTime / dailyTime.length;
  let rating: number;
  let ratingDescription: string;
  let success: boolean;
  if (average < targetTime) {
    rating = 1;
    ratingDescription = 'target time not reached :(';
    success = false;
  } else if (average === targetTime) {
    rating = 2;
    ratingDescription = 'right on :D';
    success = true;
  } else {
    rating = 3;
    ratingDescription = 'overachiever here...';
    success = true;
  }

  return {
    periodLength: dailyTime.length,
    trainingDays: dailyTime.filter(t => t > 0).length,
    success,
    rating,
    ratingDescription,
    target: targetTime,
    average
  };
};

try {
  const { targetExerciseTime, dailyExerciseTimes } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseTimes, targetExerciseTime));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
