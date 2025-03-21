import { IsArray, IsNumber, IsObject } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEducationDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdfadsfadf',
        required : true
    })
    title: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdfadsfadf',
        required : true
    })
    description: string;


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { head1: 'string', body1: 'string', head2: 'string', body2: 'string' },
        required: true
    })
    EducationBody: { head1: string, body1: string, head2: string, body2: string };

    
    
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['' , ''],
        required: true
    })
    video: string[];


    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['' , ''],
        required: true
    })
    pictures: string[]

}
