import mongoose, { connect } from "mongoose";
import { User } from "../../model/schema/user.schema.model";

const CheckPhoneNumberIfExsistBefore=async(phonenumber:string)=>{
    try{
        await connect(`mongodb://localhost:27017/servercar`);
        const DocUser=await User.findOne({phone:phonenumber})
        if(!DocUser){throw {state:400,message:`the number exsist before or padding to valditon number `}}
        return
    }
    catch(e){ throw e}
}

export {CheckPhoneNumberIfExsistBefore}