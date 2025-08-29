import {Request,Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';

interface viewerSchema {
    id:string,
    role:string
}

const AuthoriztionViewer=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token =req.cookies.token||req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
          }


        const decoded = jwt.verify(token,`magazin`) as viewerSchema ;
        if(decoded.role!=`viewer`){
            return res.status(403).json({ message: 'Unauthorized for this action' });
        }

        res.locals.dataViewer=decoded;
        next();
    }
    catch(e:any){
        return res.status(500).json({ message: e.message }); 
    }
}

export {AuthoriztionViewer}