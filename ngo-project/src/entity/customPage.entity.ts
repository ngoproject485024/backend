import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { mongo } from "mongoose";




export interface customPagesInterface extends Document {

    enTitle: string,
    ruTitle: string,
    path: string,
    haseSubPage: boolean,
    template: number,
    Children: mongoose.Types.ObjectId,
    parent: mongoose.Types.ObjectId,
    content: mongoose.Types.ObjectId
    admin: mongoose.Types.ObjectId;

}




@Schema({ timestamps: true })
export class customPages {
    @Prop({ type: String })
    enTitle: string

    @Prop({ type: String })
    ruTitle: string

    @Prop({ type: String })
    path: string

    @Prop({ type: Boolean, default: false })
    haseSubPage: boolean

    @Prop({ type: Number })
    template: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage' })
    Children: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage' })
    parent: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'pagesContent' })
    content: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'admin' })
    admin: mongoose.Types.ObjectId;
}


export const customPagesSchema = SchemaFactory.createForClass(customPages);