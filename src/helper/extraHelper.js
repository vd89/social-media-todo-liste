import debug from 'debug';

const logger = debug('app:extraHelper -> ');

export const testAuth = async (req, res, next) => {
  try {
    const testData = {
      testDetails: 'The test is working fine ',
    };
    return res.ok({ message: 'SUCCESS', data: testData });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const pingRes = async (req, res, next) => {
  try {
    const pongData = {
      pongDetails: 'This is the the pong response',
    };
    return res.ok({ message: 'SUCCESS', data: pongData });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
