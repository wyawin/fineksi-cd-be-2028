import { Router } from 'express';
import { WorkflowController } from '../controllers/workflow.controller';
import { validateWorkflow } from '../middleware/validateWorkflow';

const router = Router();
const workflowController = new WorkflowController();

router.post('/', validateWorkflow, workflowController.create);
router.get('/', workflowController.findAll);
router.get('/:id', workflowController.findOne);
router.put('/:id', validateWorkflow, workflowController.update);
router.delete('/:id', workflowController.delete);

export default router;