import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";




export interface pageContentsInterface extends Document {
    image: string[]
    peTitle: string
    enTitle: string
    ruTitle: string
    peDescription: string
    enDescription: string
    ruDescription: string
    peContent: string
    enContent: string
    ruContent: string
    page: mongoose.Types.ObjectId
}




@Schema({ timestamps: true })
export class pageContents {

    @Prop({ type: [String] })
    image: string[]

    @Prop({ type: String })
    peTitle: string

    @Prop({ type: String })
    enTitle: string

    @Prop({ type: String })
    ruTitle: string

    @Prop({ type: String })
    peDescription: string

    @Prop({ type: String })
    enDescription: string

    @Prop({ type: String })
    ruDescription: string

    @Prop({ type: String })
    peContent: string

    @Prop({ type: String })
    enContent: string

    @Prop({ type: String })
    ruContent: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage' })
    page: mongoose.Types.ObjectId
}



export const pageContentsSchema = SchemaFactory.createForClass(pageContents);