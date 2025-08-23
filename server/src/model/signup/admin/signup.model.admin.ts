import { Admin } from "../../schema/admin.schema.model";
import mongoose, { connect } from "mongoose";
import bcrypt from 'bcrypt';




const StoreAdminDb=async(name:string,password:string,permission:number)=>{
    try{
        await connect(`mongodb://localhost:27017/servercar`);
        const HashPassport=bcrypt.hashSync(password,10);
        const newAdmin=new Admin({name:name,password:HashPassport,permission:permission});
        const DocAdmin=await newAdmin.save();
        return DocAdmin;

    }
    catch (err) {
        throw err;
      } finally {
        await mongoose.connection.close();
      }
}
export{StoreAdminDb}