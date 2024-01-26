import { Router } from 'express';
import participantRouter from './participantRouter';

const appRouter = Router();

appRouter.use('/participant', participantRouter)

export default appRouter;