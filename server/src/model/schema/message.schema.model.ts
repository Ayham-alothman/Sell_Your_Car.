import { Schema, model, Document, Types } from 'mongoose';

interface IOwner {
  _id: Types.ObjectId;
  modelType: 'User' | 'Admin';  // Discriminator field
}

// 2. Message Interface
interface IMessage extends Document {
  content: string;
  own: IOwner;                  // Polymorphic reference
  chatid: Types.ObjectId;       // Reference to Chat
  createdAt: Date;
}

// 3. Create the Schema
const messageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true
  },
  own: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    modelType: {
      type: String,
      required: true,
      enum: ['User', 'Admin']  // Only allow these two types
    }
  },
  chatid: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  }
}, {
  timestamps: true
});

// 4. Create and export the Model
const Message = model<IMessage>('Message', messageSchema);
export default Message;