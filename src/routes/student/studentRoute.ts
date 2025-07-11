import express,{ Request,Response } from "express";
import { StudentController } from "../../controllers/student/studentController";
import { Istudent } from "../../interfaces/studentInterface";

export class StudedentRoute{
    private studentController : StudentController;
    private studentRouter:express.Router;
    constructor(studentController:StudentController){
     this.studentController=studentController
     this.studentRouter=express.Router()
     this.setRoute()
    }
    private setRoute(){
        this.studentRouter.post('/signup',(req:Request,res:Response)=>{
            this.studentController.studentRegister(req,res)
        })
        this.studentRouter.post('/login',(req:Request,res:Response)=>{
            this.studentController.studentLogin(req,res)
        })
        this.studentRouter.get('/profile/:id',(req:Request,res:Response)=>{
            this.studentController.showProfile(req,res)
        })
        this.studentRouter.put('/update/:id',(req:Request,res:Response)=>{
            this.studentController.updateProfile(req,res)
        })
    }

    public getStudentRouter(){
       return this.studentRouter;
    }
}