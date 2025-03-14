import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createDocumentsDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    name : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    email : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    interfaceName : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    describtion : string;

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    phone : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    type : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    title : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'document example',
        required : true
    })
    file : string;
}