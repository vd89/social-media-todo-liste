import { Router } from 'express';
import { getAllUsers, getUserById, loginUser, registerUser, userLogout } from '../controllers/userCtrl.js';
import { loginRules, registerRules, validate } from '../helper/validators.js';
import { userAuth } from '../middleware/errorMiddleware.js';

const _userRoutes = new Router();

_userRoutes.post('/register', registerRules(), validate, registerUser);

_userRoutes.post('/login', loginRules(), validate, loginUser);

_userRoutes.get('/', userAuth, getAllUsers);

_userRoutes.get('/:userId', userAuth, getUserById);

_userRoutes.get('/logout', userLogout);

export default _userRoutes;
