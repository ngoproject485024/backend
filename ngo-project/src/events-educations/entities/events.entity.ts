import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface EventsInterface extends Document {

    type: number;

    title: string;

    description: string;

    EventsBody: { head: string, body: string };

    video: string[];

    pictures: string[]

    admin: { userName: string, firstName: string, lastName: string }

}


@Schema({ timestamps: true })
export class Events {

    @Prop({ type: Number })
    type: number;

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: { head: { type: String }, body: { type: String } }})
    EventsBody: { head: string, body: string};

    @Prop({ type: [String] })
    video: string[];

    @Prop({ type: [String] })
    pictures: string[]

    @Prop({ type: { userName: { type: String }, firstName: { type: String }, lastName: { type: String } } })
    admin: { userName: string, firstName: string, lastName: string }

}


export const EventsSchema = SchemaFactory.createForClass(Events);