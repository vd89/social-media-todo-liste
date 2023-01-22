import { Router } from 'express';
import { testAuth } from '../helper/extraHelper.js';

const _todoRoutes = new Router();

// test Route
_todoRoutes.get('/', testAuth);

export default _todoRoutes;
