import { Istudent } from "../../interfaces/studentInterface";   
export interface IstudentServices{
    createStudent(student:Istudent):Promise<Istudent>
    studentLogin(email:string,password:string):Promise<Istudent>
    findStudentById(id:string):Promise<Istudent | null>
    updateProfile(id:string,student:Partial<Istudent |null>):Promise<Istudent>
}