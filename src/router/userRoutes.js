import { Router } from 'express';
import { loginUser, registerUser, userLogout } from '../controllers/userCtrl.js';
import { testAuth } from '../helper/extraHelper.js';
import { loginRules, registerRules, validate } from '../helper/validators.js';

const _userRoutes = new Router();

// test Route
_userRoutes.get('/', testAuth);

_userRoutes.post('/register', registerRules(), validate, registerUser);

_userRoutes.post('/login', loginRules(), validate, loginUser);

_userRoutes.get('/logout', userLogout);

export default _userRoutes;
