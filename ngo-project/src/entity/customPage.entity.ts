import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { mongo } from "mongoose";




export interface customPagesInterface extends Document {

    enTitle: string,
    ruTitle: string,
    peTitle: string
    path: string,
    hasSubPage: boolean,
    template: number,
    Children: mongoose.Types.ObjectId[],
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
    peTitle: string

    @Prop({ type: String })
    path: string

    @Prop({ type: Boolean, default: false })
    hasSubPage: boolean

    @Prop({ type: Number })
    template: number

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'customPage'  , default : []})
    Children: mongoose.Types.ObjectId[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'customPage'  , default : null})
    parent: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'pagesContent' , default : null })
    content: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'admin' })
    admin: mongoose.Types.ObjectId;
}


export const customPagesSchema = SchemaFactory.createForClass(customPages);