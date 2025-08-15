import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


type title = "title" | "description" | "image";

export interface pageContentsInterface extends Document {
    peContent: [{
        title: title,
        content: string;
    }]
    enContent: [{
        title: title,
        content: string;
    }]
    ruContent: [{
        title: title,
        content: string;
    }]
    page: mongoose.Types.ObjectId
}




@Schema({ timestamps: true })
export class pageContents {

    @Prop({
        type: [
            {
                title: { type: String },
                content: {
                    type: String
                }
            }
        ]
    })
    peContent: {
        title: title,
        content: string;
    }[];

    @Prop({
        type: [
            {
                title: { type: String },
                content: {
                    type: String
                }
            }
        ]
    })
    enContent: {
        title: title,
        content: string;
    }[]

    @Prop({
        type: [
            {
                title: { type: String },
                content: {
                    type: String
                }
            }
        ]
    })
    ruContent: {
        title: title,
        content: string
    }[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage' })
    page: mongoose.Types.ObjectId
}


export const pageContentsSchema = SchemaFactory.createForClass(pageContents);