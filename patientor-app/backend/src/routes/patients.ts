import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, {toNewPatientDiagnoseEntry} from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(patientService.getPatients());
})

router.get('/:id',(req,res) => {
  const patient = patientService.getParticularPatient(req.params.id);
  if(!patient){
    return res.status(404).send('Patient not found');
  }
  return res.send(patient);
})

router.post('/', (req,res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  }catch(error: unknown){
    let errorMessage = 'Something went wrong.'

    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    
    res.status(400).send(errorMessage);
  }
})

router.post('/:id/entries', (req, res) => {
  try{
    const id = String(req.params.id);
    const patient = patientService.getParticularPatient(id);

    if(!patient){
      res.status(404).json({error:"Patient not found"});
    }

    const newDiagnoseEntry = toNewPatientDiagnoseEntry(req.body);
    const addedDiagnoseEntry = patientService.addEntry(newDiagnoseEntry,id);
    res.json(addedDiagnoseEntry);
  }catch(error: unknown){
    let errorMessage = 'Something went wrong.'

    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    
    res.status(400).send(errorMessage);
  }
})

export default router;