import { IPublication } from "./publication";
import { IStudent } from "./student";

export interface IAssignment {
    _id?: any;
    student: IStudent; 
    publication: IPublication;
	note: number;
	remark: string;
    doneDate: Date;
    name: string;
    depositUrl: string;
    isMarked: boolean;
}