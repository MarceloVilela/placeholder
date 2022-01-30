import { Router } from 'express';

import technewsRouter from '@modules/technews/infra/http/routes/posts.routes';
import technewsSourceRouter from '@modules/technewsSource/infra/http/routes/posts.routes';

import BrowserRouter from '@modules/browser/infra/http/routes/browser.routes';
//
import techSourceRouter from '@modules/techSource/infra/http/routes/tech.routes';
//
import magnetSourceRouter from '@modules/magnetSource/infra/http/routes/magnet.routes';
//

const routes = Router();

routes.use('/technews', technewsRouter);
routes.use('/technews-source', technewsSourceRouter);

routes.use('/browser', BrowserRouter);

routes.use('/tech-source', techSourceRouter);

routes.use('/magnet-source', magnetSourceRouter);

export default routes;
