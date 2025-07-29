import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface accessPointInterface extends Document {

    englishName: string;
    persianName: string;

}





@Schema({ timestamps: true })
export class accessPoint {

    @Prop({ type: String })
    englishName: string;

    @Prop({ type: String })
    persianName: string;

}



export const accessPointSchema = SchemaFactory.createForClass(accessPoint);
