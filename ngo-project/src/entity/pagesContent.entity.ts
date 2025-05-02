import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




export interface pageContentsInterface extends Document {
    
}




@Schema({ timestamps: true })
export class pageContents {

    

}




export const pageContentsSchema = SchemaFactory.createForClass(pageContents);