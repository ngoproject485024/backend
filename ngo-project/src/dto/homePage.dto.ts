import { IsArray, IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsString } from "class-validator";


export class homePage {

    @IsArray()
    @ApiProperty({
        example: [],
        required: true
    })
    mainImages: string[]



    @IsArray()
    @ApiProperty({
        example: [],
        required: true
    })
    middleImages: string[]


    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peProjectDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peNgoDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enProjectDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enNgoDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruProjectDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruNgoDescription: string

    @IsNotEmpty()
    @IsArray()
    firstBannerImage: string[]
    
    @IsNotEmpty()
    @IsString()
    peFirstBannerDescription: string
    
    @IsNotEmpty()
    @IsString()
    enFirstBannerDescription: string
    
    @IsNotEmpty()
    @IsString()
    ruFirstBannerDescription: string

     @IsNotEmpty()
    @IsArray()
    secondBannerImage: string[]
    
    @IsNotEmpty()
    @IsString()
    peSecondBannerDescription: string
    
    @IsNotEmpty()
    @IsString()
    enSecondBannerDescription: string
    
    @IsNotEmpty()
    @IsString()
    ruSecondBannerDescription: string
    
    @IsNotEmpty()
    @IsBoolean()
    permitedToShowSecondBanner: boolean

    @IsNotEmpty()
    @IsNumber()
    ngoAlgo: number

}



export class completeProjectCreation {

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruDescription: string

    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peDescription: string
}



export class pageDescriptionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'educations || events || Participation || countries',
    required: true,
  })
  type: string;



  @IsObject()
  @ApiProperty({
    example: {
      peDescription: '',
      enDescription: '',
      ruDescription: '',
      pdf: [],
    },
    required: true,
  })
  description: {
    peDescription: string;
    enDescription: string;
    ruDescription: string;
    pdf : string[];
  };
}



export class setFooterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peDescription: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : ['picLink'],
        required : true
    })
    logo : string[]

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enDescription: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruDescription: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    peAddress: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    enAddress: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    ruAddress: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    gmail: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    instaLink: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    xLink: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    linkedInLink: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        required: true
    })
    faceBookLink: string;

}




export class aboutUsDto{

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : ['link'],
        required : true
    })
    middleImages: string[]


    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    peTitle: string
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    enTitle: string
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    ruTitle: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    peDescription: string
    
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    peMiddleImageDescription: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    enDescription: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    enMiddleImageDescription: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    ruDescription: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    ruMiddleImageDescription: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    peMissionAndGoals: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    enMissionAndGoals: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'description',
        required : true
    })
    ruMissionAndGoals: string 


    @IsNotEmpty()
    @IsString()
    peFirstManagerDescription : string;
    
     @IsNotEmpty()
    @IsString()
    enFirstManagerDescription : string;
    
     @IsNotEmpty()
    @IsString()
    ruFirstManagerDescription : string;
    
     @IsNotEmpty()
    @IsString()
    peSecondManagerDescription : string;
    
    @IsNotEmpty()
    @IsString()
    enSecondManagerDescription : string;
    
    @IsNotEmpty()
    @IsString()
    ruSecondManagerDescription : string;
    
    @IsNotEmpty()
    @IsArray()
    firstManagerImage : string[];
    
    @IsNotEmpty()
    @IsArray()
    secondManagerImage : string[];
    
    @IsNotEmpty()
    @IsString()
    peFirstManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    peSecondManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    enFirstManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    enSecondManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    ruFirstManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    ruSecondManagerFooterTitle: string
    
    @IsNotEmpty()
    @IsString()
    peFirstManagerFooterDescription: string
    
    @IsNotEmpty()
    @IsString()
    peSecondManagerFooterDescription: string
    
    @IsNotEmpty()
    @IsString()
    enFirstManagerFooterDescription: string
    
    @IsNotEmpty()
    @IsString()
    enSecondManagerFooterDescription: string
    
    @IsNotEmpty()
    @IsString()
    ruFirstManagerFooterDescription: string
    
    @IsNotEmpty()
    @IsString()
    ruSecondManagerFooterDescription: string

    
    @IsNotEmpty()
    @IsBoolean()
    permitedToShowFirstManager:boolean
    
    @IsNotEmpty()
    @IsBoolean()
    permitedToShowSecondManager:boolean
}