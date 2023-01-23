import debug from 'debug';
import User from '../models/userModel.js';
import { comparePassword, encrypt, generateAuthToken } from '../helper/encryptionHelper.js';
import { isValidObjectId } from 'mongoose';

const logger = debug('app:userCtl -> ');

export const registerUser = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    const hashPass = await encrypt(password);
    const isUser = await User.findOne({ userName });
    if (!isUser) {
      const user = await User.create({ userName, email, password: hashPass });
      user.password = undefined;
      user.createdAt = undefined;
      const token = await generateAuthToken(user._id);
      return res.ok({ message: 'SUCCESS', data: { user, token } });
    }
    return res.error({ message: 'Please go for Login' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const isUser = await User.findOne({ userName });
    if (!isUser) {
      return res.error({ message: 'Not a valid user credentials ' });
    }
    const isPassword = await comparePassword(password, isUser.password);
    if (!isPassword) {
      return res.error({ message: 'Password incorrect' });
    }
    req.session.user = {
      name: isUser.name,
      _id: isUser.id,
      email: isUser.email,
    };
    const token = await generateAuthToken(isUser._id);
    isUser.password = undefined;
    isUser.createdAt = undefined;
    isUser.updatedAt = undefined;
    return res.ok({ message: 'LOGGED_IN_SUCCESS', data: { user: isUser, token } });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.ok('SIGNED_OUT_SUCCESS');
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

// helper for the auth
export const getUserData = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    logger(err.message);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate();
    return res.ok({ message: 'GOT_ALL_USERS', data: users });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
      return res.error({ message: 'The UserId is inCorrect' });
    }
    const user = await User.findById(userId);

    return res.ok({ message: 'GOT_USE', data: user });
  } catch (err) {
    logger(err);
    next(err);
  }
};
