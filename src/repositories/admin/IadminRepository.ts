import { Istudent } from "../../interfaces/studentInterface";
import { Iadmin } from "../../interfaces/adminInterface";

export interface IadminRepository{
createAdmin(name:string,email:string,password:string):Promise<Istudent>
getStudentByEmail(email:string):Promise<Istudent | null>
getAllStudent():Promise<Istudent[]>
}