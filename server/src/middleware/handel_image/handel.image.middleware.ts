import { NextFunction,Request,Response } from "express";
import { fileTypeFromBuffer } from 'file-type';
import sizeOf from 'image-size';
import { StoreImageInFreeImage } from "../../functions/image/store.image.freeimage";


const HandelImagToStore=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const file=req.file
        if(!file){throw {state:1,message:`do't have image upload `}}

        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedMimes.includes(file.mimetype)) {
         throw {state:400,message:`Invalid file type: ${file.mimetype}. Allowed: ${allowedMimes.join(', ')}`}
        }
        
        const fileType = await fileTypeFromBuffer(file.buffer);
        if (!fileType || !allowedMimes.includes(fileType.mime)) {
          throw {state:400,message:`File signature does not match the file extension. Possible malformed or malicious file.`}
        }
        const dimensions = sizeOf(file.buffer);
        if (!dimensions.width || !dimensions.height) {
            throw {state:400,message:`Could not determine dimensions.`}
          } 
        
        if (dimensions.width < 100 || dimensions.height < 100) {
          throw {state:400,message:`Image is too small. Minimum dimensions are ${100}x${100}px.`}
        }

        const maxSize = 8 * 1024 * 1024;
        if (file.size > maxSize) {
           throw{state:400,message:`File is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`}
          }
        
        console.log(`now end of valdition image now store in freeimage`);

        const UrlImage=await StoreImageInFreeImage(file.buffer);
        res.locals.imageUrl=UrlImage;
        next();
        

    }
    catch(e:any){
        if(e.state &&e.message){res.status(e.state).json(e.message)}
        if(e instanceof Error){res.status(403).json(e.message)}
        else{res.status(403).json(`there issue in request or internal problem in server`)}
    }
}

export {HandelImagToStore}