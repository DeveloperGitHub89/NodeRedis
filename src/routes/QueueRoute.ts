import { Router } from "express";
import { QueueController } from "../controllers/QueueController";

const router: Router = Router();
const controller  = new QueueController();

router.get('/', controller.getQueue);
router.post('/', controller.addToQueue);

export default router;