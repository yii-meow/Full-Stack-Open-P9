import patients from '../../data/patients';
import {NewEntry, NewPatientEntry, NonSensitivePatient, PatientEntry } from '../types';
import {v4 as uuidv4} from "uuid";

const getPatients = () : NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
    }));
}

const getParticularPatient = (id: string): PatientEntry => {
    const patient = patients.find(patient => patient.id === id);
    if (patient) {
        return patient;
    }
    throw new Error('Patient not found');
}

const addPatient = (entry: NewPatientEntry) : PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry,
    }
    patients.push(newPatientEntry);
    return newPatientEntry;
}

const addEntry = (entry: NewEntry, id: string): NewPatientEntry | undefined => {
    const patient = patients.find(p => p.id === id);
    
    const newEntry = {
        id: uuidv4(),
        ...entry
    }

    if(patient){
        patient.entries.push(newEntry);
        return patient;
    }

    return undefined;
}

export default {
    getPatients,
    addPatient,
    getParticularPatient,
    addEntry
}