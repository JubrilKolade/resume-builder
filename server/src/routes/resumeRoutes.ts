import express from 'express';
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from '../controllers/resumeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All resume routes are protected
router.use(auth);

router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

export default router;
