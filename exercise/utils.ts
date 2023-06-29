type Operation = 'BMI' | 'exercises'

export interface BmiResult {
    height: number;
    weight: number;
}

export interface ExerciseResult {
    target: number;
    dailyHours: number[];
}

export const parseArguments = (args: string[], op: Operation): BmiResult | ExerciseResult => {
    if (args.length != 4 && op === 'BMI') throw new Error('Please give 2 arguments only')
    if (args.length < 4 && op === 'exercises') throw new Error('Please give at least 2 arguments')

    // Check if all given arguments are numbers only
    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error("Please provide numbers only")
    }

    if (op === 'BMI') {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        const [_, __, value, ...rest] = args
        const target = Number(value)
        const dailyHours = rest.map(a => Number(a))

        return {
            target,
            dailyHours
        }
    }
}

export default parseArguments