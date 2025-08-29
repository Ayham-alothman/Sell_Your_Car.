import { User } from "../../schema/user.schema.model";
import { Subscription } from "../../schema/subscript.schema.model";
import mongoose, { connect } from "mongoose";
import bcrypt from 'bcrypt';

const StorePersonDb = async (name: string, phonenumber: string, password: string) => {
  let session;
  
  try {
    
    await connect(`mongodb://localhost:27017/servercar`);
    
    session = await mongoose.startSession();
    await session.startTransaction();
    
    const role = `person`;
    const HashPassport = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, password: HashPassport, phone: phonenumber, role: role });
    const Docperson = await newUser.save({ session });

    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(now.getFullYear() + 1);
    const newSubscription = new Subscription({ ownuser: Docperson._id, endDate: endDate });
    await newSubscription.save({ session });

    await session.commitTransaction();
    return Docperson;
    
  } catch (err) {
    
      await session?.abortTransaction();
      throw err; 
  } finally {
      await session?.endSession();
  }
}

export { StorePersonDb }