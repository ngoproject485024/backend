import { IsArray, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";


export class homePage{
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : [],
        required : true
    })
    mainImages: string[]
    
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : [],
        required : true
    })
    middleImages: string[]
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peMiddleImageDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peProjectDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peAboutUsDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    peNgoDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enMiddleImageDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enProjectDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enAboutUsDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    enNgoDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruMiddleImageDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruProjectDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruAboutUsDescription: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : '',
        required : true
    })
    ruNgoDescription: string
}