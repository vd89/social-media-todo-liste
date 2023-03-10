import _ from 'lodash';
import appConfig from '../appConfig.js';
import debug from 'debug';

const { environment } = appConfig;
const log = debug('app:extendedMiddleware');

const logRequest = async (req, message = '', resPayload = '') => {
  const { token } = req;
  log(
      JSON.stringify(
          {
            message,
            headers: req.headers,
            params: req.validatedParams,
            hostname: req.hostname,
            ip: req.ip,
            method: req.method,
            originalUrl: req.originalUrl,
            user: req.user,
            token,
            resPayload,
          },
          null,
          2,
      ),
  );
};

export const extendedRequestMiddleware = (req, res, next) => {
  req.allParams = () => _.merge(req.params, req.query, req.body);

  res.set('x-application-identifier', `social-media-todo-${environment}`);

  res.ok = (resPayload = {}) => {
    if (typeof resPayload === 'string') {
      return res.send({
        statusCode: 200,
        status: resPayload,
        data: {},
        message: res.__(resPayload),
      });
    }

    const { message = 'SUCCESS', data = {} } = resPayload;
    return res.status(200).send({
      statusCode: 200,
      status: message,
      message: res.__(message),
      data,
    });
  };

  res.created = ({ data, message }) => {
    return res.status(201).send({
      statusCode: 201,
      data: data,
      message: res.__(message),
    });
  };

  res.error = (resPayload, debugMessage) => {
    logRequest(req, debugMessage, resPayload);

    if (typeof resPayload === 'string') {
      return res.status(400).send({
        statusCode: 400,
        status: resPayload,
        error: res.__(resPayload),
        message: res.__(resPayload),
        data: {},
      });
    }

    const { statusCode = 400, message = 'BAD_REQUEST', data = {} } = resPayload;

    return res.status(statusCode).send({
      statusCode,
      status: message,
      message: res.__(message),
      error: res.__(message),
      data,
    });
  };

  res.internalServerError = (e) => {
    log(e.message);
    logRequest(req, e);

    return res.status(500).send({
      statusCode: 500,
      status: 'SOME_ERROR_OCCURRED',
      message: res.__('SOME_ERROR_OCCURRED'),
      error: res.__('SOME_ERROR_OCCURRED'),
      data: {},
    });
  };

  res.unauthorized = (message = '') => {
    log(message);
    logRequest(req);

    return res.status(401).send({
      statusCode: 401,
      status: 'UNAUTHORIZED',
      message: res.__('UNAUTHORIZED'),
      data: {},
      error: res.__('UNAUTHORIZED'),
    });
  };

  res.forbidden = () => {
    return res.status(403).send({
      statusCode: 403,
      status: 'FORBIDDEN',
      message: res.__('FORBIDDEN'),
      data: {},
      error: res.__('FORBIDDEN'),
    });
  };
  next();
};
