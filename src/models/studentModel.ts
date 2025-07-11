
import  Mongoose  from "mongoose";
import {Istudent}   from "../interfaces/studentInterface";
const studentSchema = new Mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','student'],
        default:'student'
    },
    enrollmentDate: {
        type: Date,
        default: Date.now()
    }

})

const studentModel = Mongoose.model<Istudent>('Students',studentSchema)
export default studentModel