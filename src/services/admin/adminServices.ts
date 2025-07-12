import { Iadmin } from "../../interfaces/adminInterface";
import { Istudent } from "../../interfaces/studentInterface";
import { IadminRepository } from "../../repositories/admin/IadminRepository";
import { BcryptPassword } from "../../utils/bcrypt";
import { IadminServices } from "./IadminServices";




export class AdminServices implements IadminServices{
       private bcryptPassword:BcryptPassword 
    constructor( private adminRepository:IadminRepository){
        this.bcryptPassword= new BcryptPassword()
    }
    async createAdmin(name: string, email: string, password: string): Promise<Istudent> {
        const existingEmail = await this.adminRepository.getStudentByEmail(email)
        if(existingEmail){
            throw new Error ('email already exists')
        }
        const hashPassword= await this.bcryptPassword.hashPassword(password)
        return await this.adminRepository.createAdmin(name,email,hashPassword)
    }
    async isAdminExists(email: string, password: string): Promise<Istudent> {
        const Adminexisting = await this.adminRepository.getStudentByEmail(email)
        if(!Adminexisting){
            throw new Error ('invalid Email')
        }
        if(Adminexisting.role!=='admin'){
            throw new Error ('this user is not an admin')
        }
        const isPasswordValid = await this.bcryptPassword.comparePassword(password,Adminexisting.password);
         if (!isPasswordValid) {
    throw new Error('Incorrect password');
  }
  return Adminexisting
    }
    async getallStudents(): Promise<Istudent[] | []> {
        return this.adminRepository.getAllStudent()
    }
    async getStudentById(id: string): Promise<Istudent> {
        const student=await this.adminRepository.getStudentById(id)
        if(!student){
            throw new Error('no student found')
        }
        return student
    }
    async deleteStudentById(id: string): Promise<Istudent| null> {
        const student= await this.adminRepository.deleteOneStudentById(id)
        if(!student){
            throw new Error('no student found')
        }
        return student
    }
}