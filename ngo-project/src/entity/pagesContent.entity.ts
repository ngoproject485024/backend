import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


type title = "title" | "description" | "image";

export interface pageContentsInterface extends Document {
    peContent: [{
        title: title,
        content: string | string[];
    }]
    enContent: [{
        title: title,
        content: string | string[];
    }]
    ruContent: [{
        title: title,
        content: string | string[];
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
                    type: mongoose.Schema.Types.Mixed
                }
            }
        ]
    })
    peContent: {
        title: title,
        content: string | string[];
    }[];

    @Prop({
        type: [
            {
                title: { type: String },
                content: {
                    type: mongoose.Schema.Types.Mixed
                }
            }
        ]
    })
    enContent: {
        title: title,
        content: string | string[];
    }[]

    @Prop({
        type: [
            {
                title: { type: String },
                content: {
                    type: mongoose.Schema.Types.Mixed
                }
            }
        ]
    })
    ruContent: {
        title: title,
        content: string | string[]
    }[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage' })
    page: mongoose.Types.ObjectId
}


export const pageContentsSchema = SchemaFactory.createForClass(pageContents);