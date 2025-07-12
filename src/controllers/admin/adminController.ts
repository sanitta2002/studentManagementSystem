import { Iadmin } from "../../interfaces/adminInterface";
import { Istudent } from "../../interfaces/studentInterface";
import { IadminServices } from "../../services/admin/IadminServices";
import { Request,Response } from "express";

export class AdminController{
    private adminServices:IadminServices
    constructor(adminServices:IadminServices){
        this.adminServices=adminServices
    }
    async adminLogin(req:Request,res:Response):Promise<void>{
      try{
        console.log(req.body)
        const {email,password} = req.body as {email:string,password:string}
        const admin = await this.adminServices.isAdminExists(email,password)
        if(admin){
            res.status(201).json({message:"login successfull",admin})
        }else{
            res.status(401).json({ message: "Invalid credentials" });
        }
      }catch(error){
        console.log(error)
         res.status(500).json({success: false, message: "Something went wrong" })
      }
    }
    async getAllStudents(req:Request,res:Response):Promise<void>{
        try {
            const studentList = await this.adminServices.getallStudents()
            if(studentList){
                res.status(200).json({message:"students details fetched",studentList})
            }
        } catch (error) {
            res.status(500).json({ success: false, message:'error' });
        }
    }
    async getStudentDetails(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params as {id:string}
            const student=await this.adminServices.getStudentById(id)
            if(student){
                res.status(200).json({message:'student details fetched',student})
            }
        } catch (error) {
             res.status(500).json({ success: false, message:"error" });
        }
    }
    async deleteStudent(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params as {id:string}
            const deleteStudent=await this.adminServices.deleteStudentById(id)
            if(deleteStudent){
                res.status(200).json({message:"student deleted",deleteStudent})
            }
        } catch (error) {
            res.status(500).json({success: false, message:"error"})
        }
    }
}