import {Request,Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';

interface SellerSchema {
    id:string,
    role:string
}

const AuthoriztionSeller=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token =req.cookies.token||req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
          }


        const decoded = jwt.verify(token,`magazin`) as SellerSchema ;
        if(decoded.role!=`seller`){
            return res.status(403).json({ message: 'Unauthorized for this action' });
        }

        res.locals.dataSeller=decoded;
        next();
    }
    catch(e:any){
        return res.status(500).json({ message: e.message }); 
    }
}

export {AuthoriztionSeller}