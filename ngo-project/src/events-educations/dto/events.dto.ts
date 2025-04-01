
import { IsArray, IsNumber, IsObject } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEvetsDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    peTitle: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    enTitle: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    ruTitle: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    peDescription: string;



    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    enDescription: string;



    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    ruDescription: string;


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { head: 'string', body: 'string' },
        required: true
    })
    peEventsBody: { head: string, body: string };


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { head: 'string', body: 'string' },
        required: true
    })
    enEventsBody: { head: string, body: string };


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { head: 'string', body: 'string' },
        required: true
    })
    ruEventsBody: { head: string, body: string };



    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    peVideo: string[];


    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    enVideo: string[];



    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    ruVideo: string[];



    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    pePictures: string[]


    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    enPictures: string[]



    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    ruPictures: string[]



}

