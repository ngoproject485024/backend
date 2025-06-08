import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export interface documentsInterface extends Document {

    name : string;

    email : string;

    interfaceName : string;

    description : string;

    phone : string;

    type : string[];

    title : string;

    file : string[];

    state : number;
    
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
    description : string;

    @Prop({type : String})
    phone : string;

    @Prop({type : [String]})
    type : string[];

    @Prop({type : Number , default : 0})
    state : number;            // 0 : not approved      1 : approved       // 2: rejecte

    @Prop({type : String})
    title : string;

    @Prop({type : [String]})
    file : string[];    

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'ngo'})
    ngo : mongoose.Types.ObjectId;
}


export const documentSchema = SchemaFactory.createForClass(documents);
