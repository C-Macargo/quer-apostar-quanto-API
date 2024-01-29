import { Router } from 'express';
import participantRouter from './participantRouter';
import gameRouter from './gameRouter';

const appRouter = Router();

appRouter.use('/participant', participantRouter)
appRouter.use('/game', gameRouter)

export default appRouter;