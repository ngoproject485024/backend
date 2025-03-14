import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export interface documentsInterface extends Document {

    name : string;

    email : string;

    interfaceName : string;

    describtion : string;

    phone : string;

    type : string;

    title : string;

    file : string;
    
    ngo : mongoose.Types.ObjectId;

}


@Schema({timestamps : true})
export class documents {

    @Prop({type : String})
    name : string;

    @Prop({type : String})
    email : string;

    @Prop({type : String})
    interfaceName : string;

    @Prop({type : String})
    describtion : string;

    @Prop({type : String})
    phone : string;


    @Prop({type : String})
    type : string;

    @Prop({type : String})
    title : string;

    @Prop({type : String})
    file : string;    

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'ngo'})
    ngo : mongoose.Types.ObjectId;
}


export const documentSchema = SchemaFactory.createForClass(documents);
