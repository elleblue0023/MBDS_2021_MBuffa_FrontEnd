import { Professor } from "./professor";

export interface Publication {
    _id: any;
    professor: Professor;
    message: string;
    class: string;
    course: string;
    deadline: Date;
}
