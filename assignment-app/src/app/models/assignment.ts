import { Publication } from "./publication";
import { Student } from "./student";

export interface Assignment {
    id?: any;
    student?: Student; 
    publication?: Publication;
	note?: number;
	remark?: string;
    doneDate?: Date;
    name?: string;
    depositUrl?: string;
    isMarked?: boolean;
}