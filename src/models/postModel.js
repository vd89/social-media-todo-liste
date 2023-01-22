import { model, Schema } from 'mongoose';

const _schema = new Schema(
    {
      title: { type: String },
      postBody: { type: String },
      userId: { type: Schema.ObjectId, ref: 'User' },
      commentIds: [{ type: Schema.ObjectId, ref: 'Comment' }],
    },
    {
      timestamps: true,
    },
);

// _schema.loadClass();

export default model('Post', _schema);
