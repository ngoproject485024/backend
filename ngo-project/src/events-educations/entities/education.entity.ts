import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface EducationInterface extends Document {

    type: number;

    title: string;

    description: string;

    EducationBody: { head1: string, body1: string, head2: string, body2: string };

    video: string[];

    pictures: string[]

    admin: { userName: string, firstName: string, lastName: string }

}


@Schema({ timestamps: true })
export class Education {

    @Prop({ type: Number })
    type: number;

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: { head1: { type: String }, body1: { type: String }, head2: { type: String }, body2: { type: String } } })
    EducationBody: { head1: string, body1: string, head2: string, body2: string };

    @Prop({ type: [String] })
    video: string[];

    @Prop({ type: [String] })
    pictures: string[]

    @Prop({ type: { userName: { type: String }, firstName: { type: String }, lastName: { type: String } } })
    admin: { userName: string, firstName: string, lastName: string }



}

export const EducationSchema = SchemaFactory.createForClass(Education);