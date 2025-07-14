import express from 'express';
import { generateDesign, getUserDesigns, deleteDesign } from '../controller/Design.controller.js';
import { UserAuth } from '../middleware/user.auth.js';

const router = express.Router();


router.post('/generate-design/prompt', UserAuth, generateDesign);
router.get('/my-designs', UserAuth, getUserDesigns);
router.delete('/:designId', UserAuth, deleteDesign);

export default router;