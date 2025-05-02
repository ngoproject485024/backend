import { IsArray, IsNotEmpty, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"





export class createPagesContentDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'papge id',
        required: true
    })
    id : string;

    @IsArray()
    @ApiProperty({
        example: ['link1', 'link2'],
        required: false
    })
    image: string[]


    @IsString()
    @ApiProperty({
        example: 'peTitle',
        required: false
    })
    peTitle: string

    @IsString()
    @ApiProperty({
        example: 'enTitle',
        required: false
    })
    enTitle: string

    @IsString()
    @ApiProperty({
        example: 'ruTitle',
        required: false
    })
    ruTitle: string

    @IsString()
    @ApiProperty({
        example: 'peDescription',
        required: false
    })
    peDescription: string

    @IsString()
    @ApiProperty({
        example: 'enDescription',
        required: false
    })
    enDescription: string

    @IsString()
    @ApiProperty({
        example: 'ruDescription',
        required: false
    })
    ruDescription: string

    @IsString()
    @ApiProperty({
        example: 'peContent',
        required: false
    })
    peContent: string

    @IsString()
    @ApiProperty({
        example: 'enContent',
        required: false
    })
    enContent: string

    @IsString()
    @ApiProperty({
        example: 'ruContent',
        required: false
    })
    ruContent: string
}