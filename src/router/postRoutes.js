import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/postCtrl.js';
import { userAuth } from '../middleware/errorMiddleware.js';

const _postRoutes = new Router();

// test Route
_postRoutes.get('/', userAuth, getAllPosts);

// create Post
_postRoutes.post('/', userAuth, createPost);

// edit post
_postRoutes.put('/:postId', userAuth, createPost);

export default _postRoutes;
