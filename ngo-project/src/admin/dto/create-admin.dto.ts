import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class createAdminDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'username',
        required : true
    })
    userName : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'password',
        required : true
    })
    password : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'password',
        required : true
    })
    firstName : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'password',
        required : true
    })
    lastName : string;



}