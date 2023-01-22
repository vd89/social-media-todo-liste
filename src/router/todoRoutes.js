import { Router } from 'express';
import { completeTodo, createTodo, deleteTodo, editTodo, getAllTodos } from '../controllers/todoCtrl.js';
import { userAuth } from '../middleware/errorMiddleware.js';

const _todoRoutes = new Router();

// Get All todos
_todoRoutes.get('/', userAuth, getAllTodos);

// Create the
_todoRoutes.post('/', userAuth, createTodo);

// Edit todo
_todoRoutes.post('/:id', userAuth, editTodo);

// Complete todo
_todoRoutes.put('/:id', userAuth, completeTodo);

// Delete todo
_todoRoutes.delete('/:id', userAuth, deleteTodo);

export default _todoRoutes;
