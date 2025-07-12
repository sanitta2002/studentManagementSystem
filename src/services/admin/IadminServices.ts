import { Iadmin } from "../../interfaces/adminInterface";
import { Istudent } from "../../interfaces/studentInterface";

export interface IadminServices{
    createAdmin(name:string,email:string,password:string):Promise<Istudent>
    isAdminExists(email:string,password:string):Promise<Istudent>
    getallStudents(): Promise<Istudent[] | []> ;

}