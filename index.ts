import 'reflect-metadata';
import './src/config/redis';
import express from 'express';
import { RoutePrefix } from './src/constants/RoutePrefix';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import queueRoute from './src/routes/QueueRoute';
dotenv.config();
class App{
    private static server:express.Application;
    private static readonly allowedOrigins = ['http://localhost:3000'];
    
    private static serverConfig():void{
        const options: cors.CorsOptions = {
            origin: App.allowedOrigins
        };
        App.server.use(helmet())
        App.server.use(cors(options));
        App.server.use(express.json());
        App.server.use(express.urlencoded({ extended: true }));
    }
    private static serverRoutesConfig(){
        App.server.use(RoutePrefix.QUEUE_ROUTE_PREFIX,queueRoute);
    }
     static startServer(){
        App.server = express();
        App.serverConfig();
        App.serverRoutesConfig();
        App.server.listen(process.env.SERVER_PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${process.env.SERVER_PORT}`);
        });
    }
}
App.startServer();
