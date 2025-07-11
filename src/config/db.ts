import mongoose from "mongoose";
import dotenv from  'dotenv' ;

dotenv.config()

export class ConnectDB {
    private databaseUrl : string
    constructor(){
        if(!process.env.DB_URL){
            throw new Error("MONGO_URI is not defined in .env file")
        }
        this.databaseUrl=process.env.DB_URL
    }
    public async connectDb():Promise<void>{
        try{
            await mongoose.connect(this.databaseUrl)
            console.log('database connect')
        }catch(error){
            console.error('Error connecting mongo db')
            throw new Error('Failed to connect to mongo db')
        }
        
    }
}

