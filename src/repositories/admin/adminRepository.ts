import { Istudent } from "../../interfaces/studentInterface";
import studentModel from "../../models/studentModel";
import { IadminRepository } from "./IadminRepository";

export class AdminRepository implements IadminRepository{
    async createAdmin(name: string, email: string, password: string): Promise<Istudent> {
        return await studentModel.create({name,email,password,role:'admin'})
    }
    async getStudentByEmail(email: string): Promise<Istudent | null> {
        return await studentModel.findOne({email})
    }
    async getAllStudent(): Promise<Istudent[]> {
        return await studentModel.find({role:'student'})
    }
    async getStudentById(id: string): Promise<Istudent |null> {
        return await studentModel.findById(id)
    }
    async deleteOneStudentById(id: string): Promise<Istudent | null> {
        return await studentModel.findByIdAndDelete(id)
    }
    
}