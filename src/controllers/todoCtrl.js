import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import Todo from '../models/todoModel.js';
import User from '../models/userModel.js';
const logger = debug('app:todoCtrl -> ');

export const getAllTodos = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const todos = await Todo.find({ userId: _id });
    return res.ok({ message: 'SUCCESS', data: todos });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;
    const todo = await Todo.create({
      title,
      description,
      userId: _id,
    });

    const user = await User.findById(_id);
    user.todos.unshift(todo._id);
    await user.save();

    return res.ok({ message: 'SUCCESS', data: todo });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const editTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    if (isValidObjectId(id)) {
      const updateTodo = await Todo.findById(id);
      updateTodo.title = title;
      updateTodo.description = description;
      updateTodo.isCompleted = isCompleted;
      await updateTodo.save();
      return res.ok({ message: 'Updated the todo', data: updateTodo });
    }
    return res.error({ message: 'Please check the todo id' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const completeTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const compTodo = await Todo.findById(id);
      compTodo.isCompleted = true;
      await compTodo.save();
      return res.ok({ message: 'Updated the todo', data: compTodo });
    }
    return res.error({ message: 'Please check the todo id' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    if (isValidObjectId(id)) {
      const removeTodo = await Todo.findByIdAndDelete({ _id: id });
      const user = await User.findById(_id);
      user.todos = user.todos.filter((id) => JSON.stringify(id) !== JSON.stringify(req.params.id));
      await user.save();
      return res.ok({ message: 'Deleted the todo', data: removeTodo });
    }
    return res.error({ message: 'Please check the todo id' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
