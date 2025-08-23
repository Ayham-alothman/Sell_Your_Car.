import { Schema, model, Document, Types } from 'mongoose';

interface IStuff  {
  own: Types.ObjectId;      
  type: string;            // Type of stuff
  image: string;           // Main image URL/path
  model: string;           // Model name/number
  serialnumber: string;    // Unique serial number
  price: number;
  available:boolean;           // Price value
  createdAt: Date;
  updatedAt: Date;
}

const stuffSchema = new Schema<IStuff>({
  own: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialnumber: {
    type: String,
    required: true,
    unique: true           // Ensures serial numbers are unique
  },
  price: {
    type: Number,
    required: true,
    min: 0                 // Price can't be negative
  },
  available:{
    type:Boolean,
    default:true
  }
}, {
  timestamps: true        // Automatic createdAt and updatedAt
});

const Stuff = model<IStuff>('Stuff', stuffSchema);
export default Stuff;