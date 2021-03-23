import { IProfessor } from "./professor";
export interface IPublication {
    _id: any;
    professor: IProfessor;
    message: string;
    class: string;
    course: string;
    deadline: Date;
}
