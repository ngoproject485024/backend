import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface EventsInterface extends Document {

    type: number;

    peTitle: string;

    enTitle: string;

    ruTitle: string;

    peDescription: string;

    enDescription: string;

    ruDescription: string;

    peEventsBody: { head: string, body: string};

    enEventsBody: { head: string, body: string};

    ruEventsBody: { head: string, body: string};

    peVideo: string[];

    enVideo: string[];

    ruVideo: string[];

    pePictures: string[]

    enPictures: string[]

    ruPictures: string[]

    admin: { userName: string, firstName: string, lastName: string }

}


@Schema({ timestamps: true })
export class Events {

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

    @Prop({ type: { head: { type: String }, body: { type: String } }})
    peEventsBody: { head: string, body: string};

    @Prop({ type: { head: { type: String }, body: { type: String } }})
    enEventsBody: { head: string, body: string};

    @Prop({ type: { head: { type: String }, body: { type: String } }})
    ruEventsBody: { head: string, body: string};
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


export const EventsSchema = SchemaFactory.createForClass(Events);