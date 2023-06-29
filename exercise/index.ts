import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExecises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.json({
            "error": "Malformatte parameters"
        })
    }

    const bmi: string = calculateBmi(height, weight)
    return res.json({
        weight,
        height,
        bmi
    })
})

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        return res.status(400).send({
            error: "parameters missing"
        })
    }

    if (isNaN(Number(target))) {
        return res.status(400).send({
            error: "malformatted parameters"
        })
    }

    for (let i of daily_exercises) {
        if (isNaN(Number(i))) {
            return res.status(400).send({
                error: "malformatted parameters"
            })
        }
    }

    const result = calculateExecises(daily_exercises, target);
    return res.json(result)
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
