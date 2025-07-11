export  interface Istudent {
    id?:string;
    name:string;
    email:string;
    password:string;
    role:'admin'|'student';
    enrollmentDate:String;
}