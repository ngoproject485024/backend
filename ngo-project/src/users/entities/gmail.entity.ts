import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export interface gmailInterface extends Document {
    gmail: string
}



@Schema({ timestamps: true })
export class gmails {

    @Prop({ type: String })
    gmail: string

}


export const gmailsSchema = SchemaFactory.createForClass(gmails);
