import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { validateApplication } from '../middleware/validateApplication';

const router = Router();
const applicationController = new ApplicationController();

router.post('/', validateApplication, applicationController.create);
router.get('/', applicationController.findAll);
router.get('/:id', applicationController.findOne);
router.put('/:id/process', applicationController.process);

export default router;