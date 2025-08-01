

export interface refeshTokenInterface{
    phoneNumber : string,
    level : number,
    userName : string,
    firstName : string,
    lastName : string
}



export interface adminJwtInterface{
    userName : string;
    firstName : string;
    lastName : string;
}


export interface tokenizeInterface{
    id : string;
    email : string
    userName : string
    name : string
}



export interface responseInterface{

    message : string ; 
    statusCode : number;
    error ?: string;
    data ?: string | object | any[] | boolean;

}



export interface barCharts {

}