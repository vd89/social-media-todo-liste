import { Router } from 'express';
import { createComment, getAllComments } from '../controllers/commentCtrl.js';
import { userAuth } from '../middleware/errorMiddleware.js';

const _commentRoutes = new Router();

// test Route
_commentRoutes.get('/', userAuth, getAllComments);

_commentRoutes.post('/:postId', userAuth, createComment);

export default _commentRoutes;
