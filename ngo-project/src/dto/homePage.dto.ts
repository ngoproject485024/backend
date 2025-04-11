import { IsArray, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";


export class homePage{

    @IsArray()
    @ApiProperty({
        example : [],
        required : true
    })
    mainImages: string[]
    
    

    @IsArray()
    @ApiProperty({
        example : [],
        required : true
    })
    middleImages: string[]

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peProjectDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peNgoDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enProjectDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enNgoDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruMiddleImageDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruProjectDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruAboutUsDescription: string

    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruNgoDescription: string
}