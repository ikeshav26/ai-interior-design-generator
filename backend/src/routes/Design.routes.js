import express from 'express';
import { generateDesign, getUserDesigns, deleteDesign, allDeigns } from '../controller/Design.controller.js';
import { UserAuth } from '../middleware/user.auth.js';

const router = express.Router();


router.post('/generate-design/prompt', UserAuth, generateDesign);
router.get('/my-designs', UserAuth, getUserDesigns);
router.delete('/delete/:designId', UserAuth, deleteDesign);
router.get('/explore',UserAuth,allDeigns);

export default router;