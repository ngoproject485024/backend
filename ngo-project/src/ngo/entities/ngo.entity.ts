import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";


export interface ngoInterface extends Document {
    name : string;

    nationalId : string;

    username : string;

    password : string;

    city : string;

    country : string;

    establishmentYear : string;

    activityField : string[];

    address : string;

    postal : string;

    phone : string;

    email : string;

    website : string;

    areaAndScope : string[];

    specificCultureGroup : {has : boolean , descibtion : string};

    specificActiveAreas : string[];

    areaOfExpertise:string[];

    populationConcentration : string[];

    group : string[];
    
    additionalInformation : string;
    
    socialMedia : {instagram : string , telegram : string , linkedIn : string};
    
    cooperation : boolean;
    
    license : {has : boolean, description : Boolean};

    // issuedBy : boolean;

    expiryDate : string;

    publish: {status : number , description : string};

    conditionAndConfirm : string[];

    disable : boolean;

    ownDocuments :  mongoose.Types.ObjectId[];

    documents : string[]

    projects :  mongoose.Types.ObjectId[];
}



@Schema({timestamps : true})
export class Ngo {

    @Prop({type : String})
    name : string;

    @Prop({type : String})
    username : string;

    @Prop({type : String})
    password : string;
    
    @Prop({type : String})
    city : string;
    
    @Prop({type : String})
    country : string;

    @Prop({type : String})
    nationalId : string;

    @Prop({type : String})
    establishmentYear : string;

    @Prop({type : [String]})
    activityField : string[];

    @Prop({type : String})
    address : string;

    @Prop({type : String})
    postal : string;

    @Prop({type : String})
    phone : string;

    @Prop({type : String})
    email : string;

    @Prop({type : String})
    website : string;

    @Prop({type : [String]})
    areaAndScope : string[];

    @Prop({type : {has:{type : Boolean} , descibtion : {type : String}}})
    specificCultureGroup : {has : boolean , descibtion : string};

    @Prop({type : [String]})
    specificActiveAreas : string[];

    @Prop({type : [String]})
    areaOfExpertise:string[];

    @Prop({type : [String]})
    populationConcentration : string[];

    @Prop({type : [String]})
    group : string[];

    @Prop({type : [String]})
    documents : string[]

    @Prop({type : String})
    additionalInformation : string;
    
    @Prop({type : {instagram : {type : String} , telegram : {type : String} , linkedIn : {type : String}}})
    socialMedia : {instagram : string , telegram : string , linkedIn : string};
    
    @Prop({type : Boolean})
    cooperation : boolean;
    
    @Prop({type : {has : {type : Boolean} , description : {type : String}}})
    license : {has : boolean, descibtion : Boolean};

    // @Prop({type : Boolean})
    // issuedBy : boolean;

    @Prop({type : String})
    expiryDate : string;

    @Prop({type : {status : {type : Number} , description : {type : String}}})
    publish : {status : number , description : string};

    @Prop({type : String})
    logo : string;

    @Prop({type : Boolean , default : true})
    disable : boolean;

    @Prop({type : [String]})
    documentsFile : string[];
    
    @Prop({type : [String]})
    termsAndCondition:string[];

    @Prop({type :[mongoose.Schema.Types.ObjectId] , default : [] , ref : 'document'})
    ownDocuments :  mongoose.Types.ObjectId[];

    @Prop({type :[mongoose.Schema.Types.ObjectId] , default : [] , ref : 'project'})
    projects :  mongoose.Types.ObjectId[];


}


export const ngoSchema = SchemaFactory.createForClass(Ngo);
