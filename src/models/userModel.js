import { model, Schema } from 'mongoose';
import { generateRandomString } from '../helper/encryptionHelper.js';

const _schema = new Schema(
    {
      userId: { type: String, unique: true, default: `user${generateRandomString(10)}` },
      userName: { type: String, unique: true },
      email: { type: String, unique: true },
      password: { type: String },
      todos: [{ type: Schema.ObjectId, ref: 'Todo' }],
      posts: [{ type: Schema.ObjectId, ref: 'Post' }],
      comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
    },
    {
      timestamps: true,
    },
);

// _schema.loadClass();

export default model('User', _schema);
