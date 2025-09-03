import { Schema, model, Document } from 'mongoose';

// 1. Define the Role type
type Role = 'person' | 'viewer' | 'seller';

interface IPending {
  value: boolean;
  reason: string;
}

// 2. Create an interface representing the document
interface IUser extends Document {
  name: string;
  phone: string;
  notification: boolean;
  support: boolean;
  role: Role;
  password: string;
  pending:IPending
  image?: string; // optional field
}
const PendingSchema = new Schema({
  value: {
    type: Boolean,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  }
}, {
  _id: false
});

// 3. Create the Schema
const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    
  },
  notification: {
    type: Boolean,
    default: false
  },
  support: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['person', 'viewer', 'seller'],
    default: 'person'
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    
  },
  pending:{
    required:true,
    type:PendingSchema
  },
  
  image: {
    type: String,
    required:false
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// 4. Create and export the Model
const User = model<IUser>('User', userSchema);
export  {User};