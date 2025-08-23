import { Schema, model, Document, Types } from 'mongoose';

interface IBox extends Document {
  sender: Types.ObjectId;    // Reference to User (sender)
  receiver: Types.ObjectId;  // Reference to User (receiver)
  stage: number;            // Current stage/status
  message: string;          // Communication message
  view: boolean;            // Viewed status
  idvehicle: Types.ObjectId; // Reference to Vehicle
  createdAt: Date;
  updatedAt: Date;
}

const boxSchema = new Schema<IBox>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stage: {
    type: Number,
    required: true,
    default: 1  // Starting stage
  },
  message: {
    type: String,
    required: true
  },
  view: {
    type: Boolean,
    default: false
  },
  idvehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

const Box = model<IBox>('Box', boxSchema);
export  {Box};