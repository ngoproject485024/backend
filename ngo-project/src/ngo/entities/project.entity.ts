import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export interface projectsInterface extends Document {

    name : string;

    startDate : string;

    endDate : string;

    describtion : string;

    status : string;

    location : {country : string, city : string};

    organazationName : string;

    managerName : string;

    managerEmail : string;

    managerPhone : string;


    stakeHolder : string;

    goalAndAchievements:string;

    documentsAndReport : string;

    visualDocuments : string[];
    
    moreInformation : string;

    ngo : mongoose.Types.ObjectId;

    
}


@Schema({timestamps : true})
export class projects {

    @Prop({type : String})
    name : string;

    @Prop({type : String})
    startDate : string;

    @Prop({type : String})
    endDate : string;

    @Prop({type : String})
    describtion : string;

    @Prop({type : String})
    status : string;

    @Prop({type : {country : {type : String} , city : {type : String}}})
    location : {country : string, city : string};

    @Prop({type : String})
    organazationName : string;

    @Prop({type : String})
    managerName : string;

    @Prop({type : String})
    managerEmail : string;

    @Prop({type : String})
    managerPhone : string;

    @Prop({type : String})
    stakeHolder : string;

    @Prop({type : String})
    goalAndAchievements:string;

    @Prop({type : String})
    documentsAndReport : string;

    @Prop({type : [String]})
    visualDocuments : string[];
    
    @Prop({type : String})
    moreInformation : string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ngo' })
    ngo: mongoose.Types.ObjectId;
}


export const projectSchema = SchemaFactory.createForClass(projects);
