import debug from 'debug';
import { getUserData } from '../controllers/userCtrl.js';
import { tokenVerify } from '../helper/encryptionHelper.js';
const appLog = debug('app:middleware -> ');

export const notFound = (req, res, next) => {
  res.status(404);
  // const error = `🔍 Not Found -${req.originalUrl}`;
  res.json({
    data: {
      msg: `🔍 Not Found -${req.originalUrl}`,
    },
  });
  next();
};

export const errHandler = (err, req, res, next) => {
  const statusCode = req.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    data: {
      msg: err.message,
      stack: process.env.NODE_ENV === 'production' ? ' 🌵 🌵 ' : err.stack,
    },
  });
  next();
};

export const headerFunction = (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header(
      'Access-Control-Allow-Headers',
      [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Accept-Language',
        'x-client-id',
        'x-client-secret',
        'x-client-device',
        'x-social-media-todo-token',
      ].join(', '),
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
};

export const unauthorizedErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    appLog(err);
  }
  next();
};

export const userAuth = async (req, res, next) => {
  const getToken = req.header('x-social-media-todo-token');
  if (!getToken) {
    return res.unauthorized(`Don't have the, authorization to access`);
  }
  // Verify the Token
  try {
    const deCoded = await tokenVerify(getToken);
    const user = await getUserData(deCoded.user);
    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
