import express ,{ Request,Response } from "express";
import { AdminController } from "../../controllers/admin/adminController";

export class AdminRouter{
    
    private adminRouter:express.Router
    constructor(private adminController : AdminController){
        this.adminController=adminController
        this.adminRouter=express.Router()
        this.setAdminRoute()
    }
    private setAdminRoute(){
        this.adminRouter.post('/login',(req:Request,res:Response)=>{
            this.adminController.adminLogin(req,res)
        })
        this.adminRouter.get('/getAllStudent',(req,res)=>{
            this.adminController.getAllStudents(req,res)
        })
    }
    public getAdminRouter(){
        return this.adminRouter;
    }
}