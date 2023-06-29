import { DiagnoseEntry, Discharge, Entry, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave } from "./src/types";

const toNewPatientEntry = (object: unknown) : NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing patient data');
    }

    if ('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object
        && 'ssn' in object && 'entries' in object){
        const newPatientEntry: NewPatientEntry = {
            name: parseName(object.name),
            ssn: parseSSN(object.ssn),
            occupation: parseOccupation(object.occupation),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            entries: parseEntry(object.entries as unknown[])
        };
        return newPatientEntry;
    }
    throw new Error('Incorrect or missing patient data');
}

 export const toNewPatientDiagnoseEntry = (entry: NewEntry) : NewEntry => {
    if (!entry || typeof entry !== 'object' || !entry.type) {
        throw new Error('Incorrect or missing diagnose data');
    }
    switch (entry.type){
        case "HealthCheck":            
            return {
                description:parseDescription(entry.description),
                date:parseDate(entry.date),
                specialist:parseSpecialist(entry.specialist),
                diagnosisCodes:parseDiagnoseCodes(entry),
                type:entry.type,
                healthCheckRating:parseHealthCheckRating(entry.healthCheckRating),
            };
        case "Hospital":
            return {
                description:parseDescription(entry.description),
                date:parseDate(entry.date),
                specialist:parseSpecialist(entry.specialist),
                diagnosisCodes:parseDiagnoseCodes(entry),
                type:entry.type,
                discharge:parseDischarge(entry.discharge),
            };
        case "OccupationalHealthcare":
            return {
                description:parseDescription(entry.description),
                date:parseDate(entry.date),
                specialist:parseSpecialist(entry.specialist),
                diagnosisCodes:parseDiagnoseCodes(entry),
                type:entry.type,
                employerName:parseName(entry.employerName),
                sickLeave:parseSickLeave(entry.sickLeave),
            };
    }
}

const parseDiagnoseCodes = (object: unknown) : Array<DiagnoseEntry['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)){
        return [] as Array<DiagnoseEntry['code']>;
    }
    return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
}

const parseName = (name: unknown): string => {
    if (!isString(name)){
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}

const parseOccupation = (occupation: unknown) : string => {
    if (!isString(occupation)){
        throw new Error('Invalid occupation');
    }
    return occupation;
}

const parseGender = (gender: unknown) : Gender => {
    if(!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
}

const parseDate = (date: unknown) : string => {
    if (!isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date ' + date);
    }
    return date;
}

const parseEntry = (entries: unknown[]): Entry[] => {
    if (!Array.isArray(entries)){
        throw new Error('Incorrect or missing entries');
    }
    return entries.map((entry) => {
        if (isEntry(entry)){
            return entry;
        }else{
            throw new Error("Invalid Entry");            
        }
    })
}

const parseDescription = (description: unknown): string => {
    if (!isString(description)){
        throw new Error('Incorrect or missing description');
    }
    return description;
}

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)){
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
}

const parseHealthCheckRating = (healthCheckRating: unknown) : HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)){
        throw new Error("Incorrect or missing health check rating");
    }
    return healthCheckRating;
}

const parseDischarge = (discharge:any) : Discharge => {
    if(!discharge || !isDischarge(discharge)){
        throw new Error("Incorrect or missing discharge");
    }
    return discharge;
}

const parseSickLeave = (sickLeave:any) : SickLeave | undefined => {
    if(!sickLeave){
        return undefined;
    }

    if(!isSickLeave(sickLeave)){
        throw new Error("Incorrect sick leave");
    }

    return sickLeave;
}

const isString = (text: unknown): text is string => {
    return text !== '' && (typeof text === 'string' || text instanceof String);
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isEntry = (entry: unknown): entry is Entry => {
    if (typeof entry === 'object' && entry !== null
        && 'type' in entry && typeof (entry as {type: unknown}).type === 'string' && 
        isValidEntryType((entry as {type: string}).type)
    ){
        return true;
    }
    return false;
}

const isValidEntryType = (type: string): boolean => {
    return ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(type);
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const isDischarge = (discharge:any) : boolean => {
    if (discharge.date && discharge.criteria && isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria)){
        return true;
    }
    return false;
}

const isSickLeave = (sickLeave:any) : boolean => {
    if (sickLeave.startDate && sickLeave.endDate && isString(sickLeave.startDate) && isDate(sickLeave.startDate
        && isString(sickLeave.endDate)) && isDate(sickLeave.endDate)){
        return true;
    }
    return false;
}

export default toNewPatientEntry;