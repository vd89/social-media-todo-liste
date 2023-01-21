import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';

const log = debug('app:apiRoutes -> ');

const apiRoutes = new Router();

apiRoutes.get('/v1/test', testAuth);


export default apiRoutes;
