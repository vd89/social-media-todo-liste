import { Router } from 'express';
import { testAuth } from '../helper/extraHelper.js';

import commentRoutes from './commentRoutes.js';
import postRoutes from './postRoutes.js';
import todoRoutes from './todoRoutes.js';
import userRoute from './userRoutes.js';

const apiRoutes = new Router();

apiRoutes.get('/v1/test', testAuth);

// User Route '/api/v1/user
apiRoutes.use('/v1/user', userRoute);

// Todo Route '/api/v1/todo
apiRoutes.use('/v1/todo', todoRoutes);

// Post Route '/api/v1/post
apiRoutes.use('/v1/post', postRoutes);

// Comment Route '/api/v1/comment
apiRoutes.use('/v1/comment', commentRoutes);

export default apiRoutes;
