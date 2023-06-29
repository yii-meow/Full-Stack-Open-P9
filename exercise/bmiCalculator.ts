import { parseArguments, BmiResult } from "./utils"

export const calculateBmi = (height: number, weight: number): string => {
    let BMI: number = weight / (height / 100) ** 2

    if (BMI < 18.5) {
        return "Underweight"
    } else if (BMI > 25) {
        return "Overweight"
    } else {
        return "Normal (healthy weight)"
    }
}

try {
    const result = parseArguments(process.argv, "BMI")
    const { height, weight } = result as BmiResult
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}