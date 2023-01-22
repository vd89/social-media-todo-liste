import { model, Schema } from 'mongoose';

const _schema = new Schema(
    {
      title: { type: String },
      description: { type: String },
      isCompleted: { type: Boolean, default: false },
      userId: { type: Schema.ObjectId, ref: 'User' },
    },
    {
      timestamps: true,
    },
);

// _schema.loadClass();

export default model('Todo', _schema);
