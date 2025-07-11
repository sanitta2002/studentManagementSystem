import { Istudent } from "../../interfaces/studentInterface";
import { IstudentServices } from "../../services/student/IstudentServices";
import { Request,Response } from "express";

export class StudentController {
  private studentSerices: IstudentServices;
  constructor(studentSerices: IstudentServices) {
    this.studentSerices = studentSerices;
  }
  async studentRegister(req: Request, res: Response): Promise<void> {
    try {
      const student: Istudent = req.body;
      const result = await this.studentSerices.createStudent(student);
      res.status(201).json({ message: "Student create" });
    } catch (error) {
      
        res.status(500).json({ success: false, message:"error" });
      
    }
  }
  async studentLogin(req:Request,res:Response):Promise<void>{
    try{
        
        const {email,password}=req.body
        const student=await this.studentSerices.studentLogin(email,password);
        if(student){
            res.status(200).json({message:'successfully logined'})
        }
    }catch(error){
        console.log(error);
       res.status(500).json({ success: false, message:"somthing is wrong" });
    }
  }
  async showProfile(req:Request,res:Response):Promise<void>{
    try{
        const {id}=req.params as {id:string}
        const result= await this.studentSerices.findStudentById(id)
        if(result){
            res.status(200).json({message:"profile data fetched", result})
        }
    }catch(error){
        res.status(500).json({ success: false, message:error });
    }
  }
  async updateProfile(req:Request,res:Response):Promise<void>{
    try {
        const {id}=req.params as {id:string}
        const userData=req.body as Istudent
        const result = await this.studentSerices.updateProfile(id,userData)
        if(result){
            res.status(200).json({message:"profile updated",result})
        }
    } catch (error) {
        res.status(500).json({ success: false, message:"error" });
    }
  }
}
