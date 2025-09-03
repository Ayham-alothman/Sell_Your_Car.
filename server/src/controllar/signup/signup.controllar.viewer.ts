import { Request,Response,NextFunction } from "express"
import { StoreviewerDb } from "../../model/signup/user/signup.model.viewer";

const SignupViewerControllar=async(req:Request,res:Response)=>{
    try{
        const name=req.body.name;
        const phone=req.body.phone;
        const password=req.body.password;
        const imageUrl=res.locals.imageUrl;
        
        const DocsNewAccountViewer=await StoreviewerDb(name,phone,password,imageUrl);
        res.status(200).json(DocsNewAccountViewer);
    }
    catch(e:any){
        if(e.state &&e.message){res.status(e.state).json(e.message)}
        else if(e instanceof Error){res.status(403).json(e.message)}
        else{res.status(403).json(`there issue in request or internal problem in server`)}
    }
}

export {SignupViewerControllar}