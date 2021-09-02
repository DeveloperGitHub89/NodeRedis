import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, unmanaged } from 'inversify';
import { ResponseKey } from '../constants/ResponseKey';
import { ResponseMessage } from '../constants/ResponseMessage';
import * as dotenv from 'dotenv';
import { redisClient } from '../config/redis';
dotenv.config();

@injectable()
export class QueueController{
    constructor() {
       this.addToQueue=this.addToQueue.bind(this);
       this.getQueue=this.getQueue.bind(this);
    }

    async addToQueue(request: Request, response: Response): Promise<Response> {
        try {
            let result:number=0; 
            redisClient.rpush('myqueue','hiiii',(error,num)=>{
                if (error) throw error;
                result=num;
            });
            console.log(result);
            return response.status(StatusCodes.CREATED).json({ "Position": result});
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error });
        }
    }
    
    async getQueue(request: Request, response: Response): Promise<Response> {
        try {
            let entries:any = [];
            redisClient.lrange('myqueue',0,-1,(error,items)=>{
                
                items.forEach((item,index) => {
                   entries.push({index,item});
                });
                console.log(entries)
            });
            return response.status(StatusCodes.OK).json(entries);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ [ResponseKey.ERROR]: error }); 
        }
    }
    
}