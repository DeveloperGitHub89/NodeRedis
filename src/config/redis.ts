import * as dotenv from 'dotenv';
import {createClient} from 'redis';
dotenv.config();

export const redisClient = createClient({
    host:process.env.REDIS_HOST,
    port:parseInt(<string>process.env.REDIS_PORT),
    password:process.env.REDIS_PASSWORD
});

redisClient.on('error',(error)=>{
   console.log(error);
});

redisClient.on('connect',()=>{
   console.log("Connected to redis");
});

redisClient.on('end',()=>{
    console.log("Disconnected from redis");
});
 
// process.on('SIGINT',()=>{
//     redisClient.quit();
// });
