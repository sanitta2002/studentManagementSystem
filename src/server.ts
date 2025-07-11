import { App } from "./app";
import { ConnectDB } from "./config/db";

const app=new App()
const database =new ConnectDB()

database.connectDb()
app.listen()

