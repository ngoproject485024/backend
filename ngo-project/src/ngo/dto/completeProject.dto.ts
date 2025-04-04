import { IsArray, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";





export class completeProject{

    @IsArray()
    @ApiProperty({
        example : [],
        required : false
    })
    achivements : string[]

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdf;lkjhvnaouds;fj;awlef',
        required : true
    })
    id : string
    


}