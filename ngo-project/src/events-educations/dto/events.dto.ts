
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
    title: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'asdfadsfadf',
        required: true
    })
    description: string;


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { head: 'string', body: 'string' },
        required: true
    })
    EventsBody: { head: string, body: string };




    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    video: string[];



    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['', ''],
        required: true
    })
    pictures: string[]

}
