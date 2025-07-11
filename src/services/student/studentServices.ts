import { IstudentServices } from "./IstudentServices";
import { Istudent } from "../../interfaces/studentInterface";
import { StudentRepositary } from "../../repositories/student/studentRepositories";
import { IstudentRepositary } from "../../repositories/student/IstudentRepositary";
import { BcryptPassword } from "../../utils/bcrypt";


export class StudentServices implements IstudentServices{
    private studentRepositary:IstudentRepositary;
    private bcryptPassword:BcryptPassword
    constructor(studentRepositary:IstudentRepositary){
        this.studentRepositary=studentRepositary
        this.bcryptPassword = new BcryptPassword()
    }
    async createStudent(student: Istudent): Promise<Istudent> {
       
        const email=student.email.toLowerCase()

        const existingEmail = await this.studentRepositary.findByStudentByEmail(email)
        if(existingEmail){
            throw new Error('email already exists')
        }
        const hashPassword=await this.bcryptPassword.hashPassword(student.password)
        const studentData = {...student,email:email,password:hashPassword}
        return await this.studentRepositary.createStudent(studentData)
    }
    async studentLogin(email: string, password: string): Promise<Istudent> {
        
        const existingEmail=await this.studentRepositary.findByStudentByEmail(email)
        if(!existingEmail){
            throw new Error('invalid email')
        }
        const passwordMatch = await this.bcryptPassword.comparePassword(password,existingEmail.password)
        if(!passwordMatch){
            throw new Error('invalid password')
        }
        return existingEmail
    }
    async findStudentById(id: string): Promise<Istudent> {
        const student=await this.studentRepositary.findStudentById(id)
       if(!student){
        throw new Error('no student found')
       }
       return student
    }
    async updateProfile(id: string, student: Partial<Istudent>): Promise<Istudent> {
        if(!student.name){
            throw new Error ("name is required")
        }
        const updateName = await this.studentRepositary.updateProfile(id,{name:student.name})
        if(!updateName){
            throw new Error("Student not found");
        }
        return updateName
    }
}