import { Student } from "./student";

export interface Assignment {
    _id?: any;
    student: Student; 
	promotionName: string;
	courseName: string;
	note: number;
	projectUrl: string;
    doneDate: Date;
    name: string;
    isDone: boolean;
}