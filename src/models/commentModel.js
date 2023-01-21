import { model, Schema } from 'mongoose';

const _schema = new Schema(
    {
      title: { type: String },
      commentBody: { type: String },
      userId: { type: Schema.ObjectId, ref: 'User' },
      postId: { type: Schema.ObjectId, ref: 'Post' },
    },
    {
      timestamps: true,
    },
);

// _schema.loadClass();

export default model('Comment', _schema);
