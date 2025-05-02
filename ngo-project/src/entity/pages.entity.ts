import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




export interface pagesInterface extends Document {
    homPage: {
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
        admin: string
    }

    aboutUs: {
        peTitle: string,
        enTitle: string,
        ruTitle: string,
        middleImages: string[],
        peDescription: string,
        peMiddleImageDescription: string,
        enDescription: string,
        enMiddleImageDescription: string,
        ruDescription: string,
        ruMiddleImageDescription: string,
        peMissionAndGoals: string,
        enMissionAndGoals: string,
        ruMissionAndGoals: string,
        admin: string
    }

    completProjects: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    ongoingProject: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    goodPractice: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    collaborationOpportunities: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    educationAndTrainingDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }


    ngoDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }


    ngoRegisterDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }


    eventsDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    archivesDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    footer: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        peAddress: string;
        enAddress: string;
        ruAddress: string;
        phone: string;
        gmail: string;
        instaLink: string;
        xLink: string;
        linkedInLink: string;
        faceBookLink: string;
        logo: string[]
        admin: string
    }

    Participation: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }

    countriesDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }
}




@Schema({ timestamps: true })
export class pages {
    @Prop({
        type: {
            mainImages: { type: [String] }, middleImages: { type: [String] }
            , peDescription: { type: String }
            , peMiddleImageDescription: { type: String }
            , peProjectDescription: { type: String }
            , peAboutUsDescription: { type: String }
            , peNgoDescription: { type: String }
            , enDescription: { type: String }
            , enMiddleImageDescription: { type: String }
            , enProjectDescription: { type: String }
            , enAboutUsDescription: { type: String }
            , enNgoDescription: { type: String }
            , ruDescription: { type: String }
            , ruMiddleImageDescription: { type: String }
            , ruProjectDescription: { type: String }
            , ruAboutUsDescription: { type: String }
            , ruNgoDescription: { type: String },
            admin: { type: String }
        }
    })
    homPage: {
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
        admin: string
    }


    @Prop({
        type: {
              peTitle: {type : String}
            , enTitle: {type : String}
            , ruTitle: {type : String}
            , middleImages: { type: [String] }
            , peDescription: { type: String }
            , peMiddleImageDescription: { type: String }
            , enDescription: { type: String }
            , enMiddleImageDescription: { type: String }
            , ruDescription: { type: String }
            , ruMiddleImageDescription: { type: String }
            , peMissionAndGoals: {type : String}
            , enMissionAndGoals: {type : String}
            , ruMissionAndGoals: {type : String}  
            , admin: { type: String }
        }
    })
    aboutUs: {
        peTitle : string,
        enTitle : string,
        ruTitle : string,
        middleImages: string[],
        peDescription: string,
        peMiddleImageDescription: string,
        enDescription: string,
        enMiddleImageDescription: string,
        ruDescription: string,
        ruMiddleImageDescription: string,
        peMissionAndGoals: string,
        enMissionAndGoals: string,
        ruMissionAndGoals: string,  
        admin: string
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
        admin: string
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
    ongoingProject: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    Participation: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    countriesDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    goodPractice: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    collaborationOpportunities: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    educationAndTrainingDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    eventsDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    ngoRegisterDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    archivesDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
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
    ngoDescription: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        admin: string
    }



    @Prop({
        type: {
            peDescription: { type: String },
            enDescription: { type: String },
            ruDescription: { type: String },
            admin: { type: String },
            peAddress: { type: String },
            enAddress: { type: String },
            ruAddress: { type: String },
            phone: { type: String },
            gmail: { type: String },
            instaLink: { type: String },
            xLink: { type: String },
            linkedInLink: { type: String },
            faceBookLink: { type: String },
            logo: { type: [String] }
        }, default: {
            peDescription: '',
            enDescription: '',
            ruDescription: '',
            peAddress: '',
            enAddress: '',
            ruAddress: '',
            phone: '',
            gmail: '',
            instaLink: '',
            xLink: '',
            linkedInLink: '',
            faceBookLink: '',
            logo: [],
            admin: '',
        }
    })
    footer: {
        peDescription: string;
        enDescription: string;
        ruDescription: string;
        peAddress: string;
        enAddress: string;
        ruAddress: string;
        phone: string;
        gmail: string;
        instaLink: string;
        xLink: string;
        linkedInLink: string;
        faceBookLink: string;
        logo: string[]
        admin: string
    }

}




export const pagesSchema = SchemaFactory.createForClass(pages);