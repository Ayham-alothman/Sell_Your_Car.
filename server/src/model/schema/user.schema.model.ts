import { Schema, model, Document } from 'mongoose';

// 1. Define the Role type
type Role = 'person' | 'viewer' | 'seller';

// 2. Create an interface representing the document
interface IUser extends Document {
  name: string;
  phone: string;
  notification: boolean;
  support: boolean;
  role: Role;
  password: string;
  image?: string; // optional field
}

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