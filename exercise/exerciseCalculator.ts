import { ExerciseResult, parseArguments } from "./utils"

interface Result {
    periodLength: number;
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExecises = (dailyHours: number[], target: number): Result => {
    let periodLength: number = dailyHours.length;
    let trainingDays: number = dailyHours.filter(d => d != 0).length;
    let average: number = dailyHours.reduce((a, b) => a + b, 0) / periodLength
    let success: boolean = average >= target;
    let rating: number;

    if (success) {
        rating = 3;
    } else {
        rating = average > target - 0.5 ? 2 : 1;
    }

    let ratingDescription: string = "";

    switch (rating) {
        case 3:
            ratingDescription = "Very Great afford!"
            break;
        case 2:
            ratingDescription = "Please keep up with your target!"
            break;
        case 1:
            ratingDescription = "Please remember your target, and come with with a good schedule"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const result = parseArguments(process.argv, 'exercises')
    const { target, dailyHours } = result as ExerciseResult
    console.log(calculateExecises(dailyHours, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}