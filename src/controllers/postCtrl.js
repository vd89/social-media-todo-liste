import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
const logger = debug('app:postCtrl -> ');

export const getAllPosts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const posts = await Post.find({ userId: _id });
    return res.ok({ message: 'SUCCESS', data: posts });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    const { title, postBody } = req.body;
    if (!postId) {
      if (isValidObjectId(_id)) {
        const newPost = await Post.create({
          title,
          postBody,
          userId: _id,
        });
        const user = await User.findById(_id);
        user.posts.push(newPost._id);
        await user.save();
        return res.ok({ message: 'POST_CREATED', data: newPost });
      }
      return res.error({ message: ' User Id is wrong Check with login' });
    }

    if (isValidObjectId(postId)) {
      const editPost = await Post.findById({ _id: postId });
      editPost.title = title;
      editPost.postBody = postBody;
      await editPost.save();
      return res.ok({ message: 'POST_EDITED', data: editPost });
    }
    return res.error({ message: 'Wrong post Id pls check' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
