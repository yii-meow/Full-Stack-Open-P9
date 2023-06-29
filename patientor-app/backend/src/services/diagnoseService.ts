import diagnoses from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
    return diagnoses;
}

const getParticularDiagnoses = (code: string) : DiagnoseEntry => {
    const diagnose = diagnoses.find(d => d.code === code);
    if(diagnose){
        return diagnose;
    }
    throw new Error("Diagnose not found");
}

export default {
    getDiagnoses,
    getParticularDiagnoses
}