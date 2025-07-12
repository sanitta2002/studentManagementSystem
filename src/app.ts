import express, { Application } from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './config/db'
import { StudentController } from './controllers/student/studentController';
import { StudedentRoute } from './routes/student/studentRoute';
import { StudentRepositary } from './repositories/student/studentRepositories';
import { StudentServices } from './services/student/studentServices';
import { AdminController } from './controllers/admin/adminController';
import { AdminRepository } from './repositories/admin/adminRepository';
import { AdminServices } from './services/admin/adminServices';
import { AdminRouter } from './routes/admin/adminRoute';


export class App{
    private app :Application;
   constructor(){
    dotenv.config()
    this.app=express()
    this.app.use(express.json())
    this.injectStudent()
    this.setStudentRoute()
    this.injectAdmin()
    this.setAdminRouter()
    
   }
   public listen(){
    this.app.listen(process.env.PORT,()=>{console.log('server is running')})
   }
    private injectStudent():StudentController{
     const studentRepositary = new StudentRepositary()
     const studentSerices = new StudentServices(studentRepositary)
     return new StudentController(studentSerices)
    }
    private setStudentRoute (){
    const studentController= this.injectStudent()
    const studentRoute = new StudedentRoute(studentController);
    this.app.use('/student', studentRoute.getStudentRouter());
    }  
    private injectAdmin():AdminController{
      const adminRepository = new AdminRepository()
      const adminServices = new AdminServices(adminRepository)
      return new AdminController(adminServices)
    }
    private setAdminRouter(){
     const adminController=this.injectAdmin()
     const adminRout = new AdminRouter(adminController)
     this.app.use('/admin',adminRout.getAdminRouter())
    }
}

