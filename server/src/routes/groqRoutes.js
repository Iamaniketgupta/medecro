import express from 'express';
import { groqMedBot, groqMedSummarise } from '../controllers/groqController.js';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send('<h1>Working Nicely</h1>'));
router.post('/groqMedBot', groqMedBot);
router.post('/groqMedSummarise', groqMedSummarise);

export default router;
