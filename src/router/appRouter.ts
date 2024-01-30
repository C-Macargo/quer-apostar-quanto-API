import { Router } from 'express';
import participantRouter from './participantRouter';
import gameRouter from './gameRouter';
import betRouter from './betRouter';

const appRouter = Router();

appRouter.use('/participant', participantRouter)
appRouter.use('/game', gameRouter)
appRouter.use('/bet', betRouter)

export default appRouter;