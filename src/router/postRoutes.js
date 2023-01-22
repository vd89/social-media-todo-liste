import { Router } from 'express';
import { testAuth } from '../helper/extraHelper.js';

const _postRoutes = new Router();

// test Route
_postRoutes.get('/', testAuth);

export default _postRoutes;
