import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req,res) => {
    res.send(diagnoseService.getDiagnoses());
})

router.get('/:code', (req,res) => {
    res.send(diagnoseService.getParticularDiagnoses(req.params.code));
})

export default router;