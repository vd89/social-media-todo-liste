import { Router } from 'express';
import { testAuth } from '../helper/extraHelper.js';

const _userRoutes = new Router();

// test Route
_userRoutes.get('/', testAuth);

export default _userRoutes;
