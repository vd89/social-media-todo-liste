import debug from 'debug';
import { body, validationResult } from 'express-validator';

const logger = debug('app:inputValidator -> ');

export const registerRules = () => {
  return [
    body('email', 'Valid email is required').isEmail().notEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }).notEmpty(),
  ];
};

export const loginRules = () => {
  return [
    body('userName', 'userName  is required').notEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }).notEmpty(),
  ];
};

export const validate = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => {
      logger(err);
      return extractedErrors.push({ [err.location]: err.param, msg: err.msg });
    });
    return res.status(400).json({ errors: extractedErrors });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
