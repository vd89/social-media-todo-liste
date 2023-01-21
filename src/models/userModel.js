import { model, Schema } from 'mongoose';

const _schema = new Schema(
    {
      userName: { type: String },
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
