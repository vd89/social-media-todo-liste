/* eslint-disable guard-for-in */
import mongoPkg from 'mongoose';
import debug from 'debug';
import appConfig from '../appConfig.js';

const log = debug('app:dbConnection ->');
const { connect, connection } = mongoPkg;
const { mongoUrl } = appConfig;

const mongoOpt = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 50000,
};

const dbController = async () => {
  try {
    log(`MongoDb -> Connected to mongoDb Server`);
    return await connect(mongoUrl, mongoOpt);
  } catch (err) {
    log(err.message);
  }
};

export default dbController;

export const setup = async () => {
  await connect(mongoUrl, mongoOpt);
};

export const dropDatabase = async () => {
  await connection.dropDatabase();
  await connection.close();
};

export const dropCollections = async () => {
  const collections = connection.collections;

  for (const key in collections) {
    const collection = await collections[key];
    await collection.deleteMany();
  }
};
