import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";





export class createCustomPageDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : "peTitle",
        required : true,
    })
    peTitle: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : "entitle",
        required : true,
    })
    enTitle: string
        
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : "ruTitle",
        required : true,
    })
    ruTitle: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "path",
        required: true,
    })
    path: string

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example : "true",
        required : true,
    })
    hasSecondSubPage: boolean


    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example : "true",
        required : true,
    })
    hasSubPage: boolean

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example : 2,
        required : true,
    })
    template: number


    @IsObject()
    @ApiProperty({
        example: {
        peTitle: "",
        enTitle: "",
        ruTitle: "",
        path: "",
        template: 1,},
        required : false,
    })
    subPage: {
        peTitle: "",
        enTitle: "",
        ruTitle: "",
        path: "",
        template: 1,
    }


    @IsObject()
    @ApiProperty({
        example: {
        peTitle: "",
        enTitle: "",
        ruTitle: "",
        path: "",
        template: 1,},
        required : false,
    })
    secondSubPage : {
        peTitle: "",
        enTitle: "",
        ruTitle: "",
        path: "",
        template: 1,        
    }

}