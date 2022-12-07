import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import { Routes } from "./routes/route.js";
import { createDatabaseConnection } from "./data/config/database.js";
import { NextFunction,Response,Request } from 'express';
import {constants} from 'http2';

const {HTTP_STATUS_INTERNAL_SERVER_ERROR} = constants; 
createDatabaseConnection();
const app = express();
const PORT = 8000;
const server = http.createServer(app);
app.use(cors({
    origin:"*",
}));
app.use(express.json());
app.use(Routes());

app.use(function(err:Error,req:Request,res:Response,next:NextFunction){
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message);
})
server.listen(process.env.PORT! || PORT ,()=>{
    console.log(`listening on port ${PORT}`);
})

