import express from 'express';
import { generateDesign, getUserDesigns, deleteDesign } from '../controller/Design.controller.js';
import { UserAuth } from '../middleware/user.auth.js';

const router = express.Router();

// Generate new design
router.post('/generate-design/prompt', UserAuth, generateDesign);

// Get user's designs
router.get('/my-designs', UserAuth, getUserDesigns);

// Delete a design
router.delete('/design/:designId', UserAuth, deleteDesign);

export default router;