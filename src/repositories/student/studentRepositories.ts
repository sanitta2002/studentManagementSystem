
import { Istudent } from "../../interfaces/studentInterface";
import { IstudentRepositary } from "./IstudentRepositary";
import studentModel from "../../models/studentModel";

export class StudentRepositary implements IstudentRepositary{
    async createStudent(student: Istudent): Promise<Istudent> {
        return studentModel.create(student)
    }
    async findByStudentByEmail(email: string): Promise<Istudent | null> {
        return  studentModel.findOne({email})
    } 
    async findStudentById(id: string): Promise<Istudent | null> {
        return  studentModel.findById(id)
    }
    async updateProfile(id: string, student: Partial<Istudent>): Promise<Istudent |null> {
        return  studentModel.findByIdAndUpdate(id,student,{new:true})
    }
}

