import { NextFunction,Request,Response } from "express";
import { CheckPhoneNumberIfExsistBefore } from "../../functions/phone/valditon.phone.exsist.before";


const ValditionDataSignupViewer=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.body.name){throw {state:400,message:`do't have name for signup`}}
        if(req.body.name.length<3){throw {state:400,message:`the name must have 3 chracters or more`}}
        if(req.body.phone){throw {state:400,message:`do't have phone for signup `}}
        if(req.body.phone.length!=9){throw {state:400,message:`there problem in formate number`}}
        if(String(req.body.phone)[0]!=`9`){throw {state:400,message:`there problem in formate number`}}
        if(isNaN(req.body.phone)){throw {state:400,message:`the phone have char else number`}}
        if(req.body.password){throw {state:400,message:`do't have password for signup`}}
        if(req.body.password.length<8){throw {state:400,message:`the password must be 8 char or more`}}
        await CheckPhoneNumberIfExsistBefore(req.body.phone);
        next()
    }
    catch(e:any){
        if(e.state &&e.message){res.status(e.state).json(e.message)}
        if(e instanceof Error){res.status(403).json(e.message)}
        else{res.status(403).json(`there issue in request or internal problem in server`)}
    }
}

export {ValditionDataSignupViewer}