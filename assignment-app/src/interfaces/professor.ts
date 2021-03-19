export interface Professor {
    _id: any;
    lastname: string;
    surname: string;
    email: string;
    password: string;
    isConnected: boolean;
    occupation : [{course: string, promotion: string}];
}
