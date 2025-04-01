import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface adminInterface extends Document {

    firstName : string;

    lastName : string;

    userName : string;

    password : string;

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


}



export const AdminSchema = SchemaFactory.createForClass(Admin);
