import { Istudent } from "../../interfaces/studentInterface";

export interface IstudentRepositary{
    createStudent(student:Istudent):Promise<Istudent> 
    findByStudentByEmail(email:string): Promise<Istudent |null>
    findStudentById(id:string):Promise<Istudent | null>
    updateProfile(id:string,student:Partial<Istudent>):Promise<Istudent |null>
}