import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




export interface pagesInterface extends Document {
    homPage : {
        mainImages: string[],
        middleImages: string[],
        peDescription: string,
        peMiddleImageDescription: string,
        peProjectDescription: string,
        peAboutUsDescription: string,
        peNgoDescription: string,
        enDescription: string,
        enMiddleImageDescription: string,
        enProjectDescription: string,
        enAboutUsDescription: string,
        enNgoDescription: string,
        ruDescription: string,
        ruMiddleImageDescription: string,
        ruProjectDescription: string,
        ruAboutUsDescription: string,
        ruNgoDescription: string,
        admin : string
    }

    completProjects : {
        peDescription : string;
        enDescription : string;
        ruDescription : string;
    }

}



@Schema({timestamps : true})
export class pages{
    @Prop({type : {mainImages : {type : [String]} , middleImages : {type : [String]} 
        , peDescription : {type : String} 
        , peMiddleImageDescription : {type : String} 
        , peProjectDescription : {type : String} 
        , peAboutUsDescription: { type: String }
        , peNgoDescription: { type: String }
        , enDescription : {ten : String} 
        , enMiddleImageDescription : {type : String} 
        , enProjectDescription : {type : String} 
        , enAboutUsDescription: { type: String }
        , enNgoDescription: { type: String }
        , ruDescription : {ten : String} 
        , ruMiddleImageDescription : {type : String} 
        , ruProjectDescription : {type : String} 
        , ruAboutUsDescription: { type: String }
        , ruNgoDescription: { type: String },
        admin : {type : String}
    }})
    homPage : {
      mainImages: string[],
      middleImages: string[],
      peDescription: string,
      peMiddleImageDescription: string,
      peProjectDescription: string,
      peAboutUsDescription: string,
      peNgoDescription: string,
      enDescription: string,
      enMiddleImageDescription: string,
      enProjectDescription: string,
      enAboutUsDescription: string,
      enNgoDescription: string,
      ruDescription: string,
      ruMiddleImageDescription: string,
      ruProjectDescription: string,
      ruAboutUsDescription: string,
      ruNgoDescription: string,
      admin : string
    }


    @Prop({
        type: {
            peDescription: { type: String },
            enDescription: { type: String },
            ruDescription: { type: String },
            admin: { type: String },
        }, default: {
            peDescription: '',
            enDescription: '',
            ruDescription: '',
            admin: '',
        }
    })
    completProjects: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin : string
    }


}




export const pagesSchema = SchemaFactory.createForClass(pages);