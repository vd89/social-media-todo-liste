import debug from 'debug';

const log = debug('app:extraHelper -> ');

export const testAuth = async (req, res, next) => {
  try {
    const testData = {
      testDetails: 'The test is working fine ',
    };
    return res.ok({ message: 'SUCCESS', data: testData });
  } catch (e) {
    log(e.message);
    next(e);
  }
};

export const pingRes = async (req, res, next) => {
  try {
    const pongData = {
      pongDetails: 'This is the the pong response',
    };
    return res.ok({ message: 'SUCCESS', data: pongData });
  } catch (e) {
    log(e.message);
    next(e);
  }
};
