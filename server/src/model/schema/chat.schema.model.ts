import { Schema, model, Document, Types } from 'mongoose';

interface IChat extends Document {
  chatuser: Types.ObjectId;  // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
  chatuser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true  // Automatic createdAt and updatedAt
});

const Chat = model<IChat>('Chat', chatSchema);
export  {Chat};