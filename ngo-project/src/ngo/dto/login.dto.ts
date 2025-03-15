import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginDTO{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'username',
        required : true,
    })
    username : string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'password',
        required : true,
    })
    password : string;

}