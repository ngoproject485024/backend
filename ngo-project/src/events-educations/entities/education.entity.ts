import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface EducationInterface extends Document {

    type: number;

    peTitle: string;

    enTitle: string;

    ruTitle: string;

    peDescription: string;

    enDescription: string;

    ruDescription: string;

    peEducationBody:string;

    enEducationBody:string;

    ruEducationBody:string;

    peVideo: string[];

    enVideo: string[];

    ruVideo: string[];

    pePictures: string[]

    enPictures: string[]

    ruPictures: string[]

    admin: { userName: string, firstName: string, lastName: string }

}


@Schema({ timestamps: true })
export class Education {

    @Prop({ type: Number })
    type: number;

    @Prop({ type: String })
    peTitle: string;

    @Prop({ type: String })
    enTitle: string;

    @Prop({ type: String })
    ruTitle: string;

    @Prop({ type: String })
    peDescription: string;

    @Prop({ type: String })
    enDescription: string;

    @Prop({ type: String })
    ruDescription: string;


    @Prop({ type: String})
    peEducationBody: string;

    @Prop({ type: String })
    enEducationBody: string;

    @Prop({ type: String })
    ruEducationBody: string;


    @Prop({ type: [String] })
    peVideo: string[];

    @Prop({ type: [String] })
    enVideo: string[];

    @Prop({ type: [String] })
    ruVideo: string[];

    @Prop({ type: [String] })
    pePictures: string[]

    @Prop({ type: [String] })
    enPictures: string[]

    @Prop({ type: [String] })
    ruPictures: string[]

    @Prop({ type: { userName: { type: String }, firstName: { type: String }, lastName: { type: String } } })
    admin: { userName: string, firstName: string, lastName: string }

}

export const EducationSchema = SchemaFactory.createForClass(Education);