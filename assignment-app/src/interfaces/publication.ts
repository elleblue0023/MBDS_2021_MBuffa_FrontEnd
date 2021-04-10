import { IProfessor } from "./professor";
export interface IPublication {
    _id: any;
    professor: IProfessor;
    name: string;
    message: string;
    promotion: string;
    course: string;
    deadline: string ;
    isOutofDate: Boolean;
    assignmentStudentCreated: boolean;
    receivedAssignement: number;
}


 