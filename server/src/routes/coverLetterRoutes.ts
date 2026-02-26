import express from 'express';
import { getCoverLetters, getCoverLetterById, createCoverLetter, updateCoverLetter, deleteCoverLetter } from '../controllers/coverLetterController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // Protect all cover letter routes

router.route('/')
    .get(getCoverLetters)
    .post(createCoverLetter);

router.route('/:id')
    .get(getCoverLetterById)
    .put(updateCoverLetter)
    .delete(deleteCoverLetter);

export default router;
