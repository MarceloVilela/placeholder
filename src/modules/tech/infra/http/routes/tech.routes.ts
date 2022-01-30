import { Router } from 'express';

import RefreshController from '../controllers/RefreshController';

const postsRouter = Router();
const refreshController = new RefreshController();

postsRouter.post('/refresh', refreshController.index);

export default postsRouter;
