import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export interface projectsInterface extends Document {

    name : string;

    startDate : string;

    endDate : string;

    description : string;

    status : string[];

    location : {country : string, city : string};

    organizationName : string;

    projectManagerName : string;

    projectManagerEmail : string;

    projectManagerPhone : string;

    achivements:string

    colleaguesAndStakeholders : string;

    goalAndAchievements:string[];

    documentsAndReport :  {title : string , files : string[]};

    visualDocuments : {title : string , files : string[]}[];
    
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
    description : string;

    @Prop({type : [String]})
    status : string[];

    @Prop({type : {country : {type : String} , city : {type : String}}})
    location : {country : string, city : string};
    
    @Prop({type : String})
    organizationName : string;

    @Prop({type : String})
    projectManagerName : string;

    @Prop({type : String})
    projectManagerEmail : string;

    @Prop({type : String})
    projectManagerPhone : string;

    @Prop({type : String})
    colleaguesAndStakeholders : string;
    
    @Prop({type : [String]})
    goalAndAchievements:string[];
    
    @Prop({type : String , default : ''})
    achivements:string;
    
    @Prop({type : {title : {type : String} , files : [String]}})
    documentsAndReport :  {title : string , files : string[]};

    @Prop({type : []})
    visualDocuments : {title : string , files : string[]}[];
    
    @Prop({type : String})
    moreInformation : string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ngo' })
    ngo: mongoose.Types.ObjectId;
}


export const projectSchema = SchemaFactory.createForClass(projects);
