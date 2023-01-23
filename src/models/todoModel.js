import { model, Schema } from 'mongoose';
import { generateRandomString } from '../helper/encryptionHelper.js';

const _schema = new Schema(
    {
      todoId: { type: String, unique: true, default: `todo${generateRandomString(10)}` },
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
