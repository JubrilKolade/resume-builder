import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getSettings);
router.put('/', auth, updateSettings);

export default router;
