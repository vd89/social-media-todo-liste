import { Router } from 'express';
import { testAuth } from '../helper/extraHelper.js';

const _commentRoutes = new Router();

// test Route
_commentRoutes.get('/', testAuth);

export default _commentRoutes;
