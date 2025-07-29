import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { accessPoint } from "./accessPoints.entity";


export interface adminInterface extends Document {

    firstName : string;

    lastName : string;

    userName : string;

    password : string;

    access : string[]


}





@Schema({timestamps : true})
export class Admin {

    @Prop({type : String})
    firstName : string;
    
    @Prop({type : String})
    lastName : string;
    
    @Prop({type : String})
    userName : string;
    
    @Prop({type : String})
    password : string;

    @Prop({type : [String] , default : []})
    access : string[]

}



export const AdminSchema = SchemaFactory.createForClass(Admin);
