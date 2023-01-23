import { isValidObjectId } from 'mongoose';
import Comments from '../models/commentModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { _id } = req.user;
    const { title, commentBody } = req.body;
    if (!isValidObjectId(postId)) {
      return res.error({ message: 'Post Id is not valid and wrong pls check' });
    }
    const post = await Post.findById(postId);
    const user = await User.findById(_id);
    const comment = await Comments.create({
      title,
      commentBody,
      userId: _id,
      postId,
    });
    post.commentIds.push(comment._id);
    user.comments.push(comment.id);
    await post.save();
    await user.save();
    return res.ok({ message: 'COMMENT_CREATED', data: comment });
  } catch (err) {
    next(err);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comments.find({ userId: req.user._id });
    return res.ok({ message: 'GOT_ALL_COMMENTS', data: comments });
  } catch (err) {
    next(err);
  }
};
