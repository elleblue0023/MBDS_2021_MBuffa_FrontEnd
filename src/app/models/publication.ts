import { Professor } from "./professor";

export class Publication {
    id?: any;
    professor?: Professor;
    name?: string;
    message?: string;
    promotion?: string;
    course?: string;
    deadline?: string ;
    isOutofDate?: Boolean;
    assignmentStudentCreated?: boolean;
    receivedAssignement?: number;
}


 