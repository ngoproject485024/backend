import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface EducationInterface extends Document {

    type: number;

    peTitle: string;

    enTitle: string;

    ruTitle: string;

    peDescription: string;

    enDescription: string;

    ruDescription: string;

    peEducationBody: { head1: string, body1: string, head2: string, body2: string };

    enEducationBody: { head1: string, body1: string, head2: string, body2: string };

    ruEducationBody: { head1: string, body1: string, head2: string, body2: string };

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


    @Prop({ type: { head1: { type: String }, body1: { type: String }, head2: { type: String }, body2: { type: String } } })
    peEducationBody: { head1: string, body1: string, head2: string, body2: string };

    @Prop({ type: { head1: { type: String }, body1: { type: String }, head2: { type: String }, body2: { type: String } } })
    enEducationBody: { head1: string, body1: string, head2: string, body2: string };

    @Prop({ type: { head1: { type: String }, body1: { type: String }, head2: { type: String }, body2: { type: String } } })
    ruEducationBody: { head1: string, body1: string, head2: string, body2: string };


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