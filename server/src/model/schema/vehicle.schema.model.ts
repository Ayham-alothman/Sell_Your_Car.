import { Schema, model, Document, Types } from 'mongoose';

// 1. Define TypeVehicle type
type TypeVehicle = 'car' | 'bus' | 'bikemotore';

// 2. Interface representing the Vehicle document
interface IVehicle   {
  typevehicle: TypeVehicle;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  baseimage: string;
  images: string[];
  description: string;
  pending: boolean;
  state:boolean;
  own: Types.ObjectId; // Reference to User
  // Car details
  details_car1?: number; // percentage
  details_car2?: number; // percentage
  details_car3?: number; // percentage
  // Bus details
  details_bus1?: number; // percentage
  details_bus2?: number; // percentage
  details_bus3?: number; // percentage
  // Motorcycle details
  details_motor1?: number; // percentage
  details_motor2?: number; // percentage
}

// 3. Create the Schema
const vehicleSchema = new Schema<IVehicle>({
  typevehicle: {
    type: String,
    enum: ['car', 'bus', 'bikemotore'],
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  baseimage: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true
  },
  pending: {
    type: Boolean,
    default: true
  },
  state:{
    type:Boolean,
    default:true
  },
  own: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Car details (optional)
  details_car1: {type:Number,required:false},
  details_car2: {type:Number,required:false},
  details_car3: {type:Number,required:false},
  // Bus details (optional)
  details_bus1: {type:Number,required:false},
  details_bus2: {type:Number,required:false},
  details_bus3: {type:Number,required:false},
  // Motorcycle details (optional)
  details_motor1: {type:Number,required:false},
  details_motor2: {type:Number,required:false},
}, {
  timestamps: true
});

// 4. Create and export the Model
const Vehicle = model<IVehicle>('Vehicle', vehicleSchema);
export  {Vehicle};