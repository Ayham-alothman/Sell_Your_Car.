import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
  name: string;
  password: string;
  permission: number;
}

const adminSchema = new Schema<IAdmin>({
  name: { 
    type: String,
    required: true,
     trim:true
  },
  password: {
    type: String,
    required: true // Kept requirement only
    ,trim:true
  },
  permission: {
    type: Number,
    required: true // Kept requirement only
  }
}, {
  timestamps: true // Kept automatic timestamps
});

const Admin = model<IAdmin>('Admin', adminSchema);
export  {Admin};