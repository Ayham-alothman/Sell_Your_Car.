import { Schema, model, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  _id: Types.ObjectId;
  state: string;
  startDate: Date;
  endDate: Date;
  ownuser: Types.ObjectId ;
}

const subscriptionSchema = new Schema<ISubscription>({
  state: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  ownuser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

 const Subscription = model<ISubscription>('Subscription', subscriptionSchema);
 export {Subscription}