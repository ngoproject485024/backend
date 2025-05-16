import { IsArray, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class completeProject{

    @IsString()
    @ApiProperty({
        example : 'asdfasdfvopiasjdfkl',
        required : false
    })
    achivements : string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    endDate: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdf;lkjhvnaouds;fj;awlef',
        required : true
    })
    id : string


    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdf;lkjhvnaouds;fj;awlef',
        required : true
    })
    completedReports : string



    @IsNotEmpty()
    @IsArray()
    visualDocuments: { title: string, files: string[] }[];



    @IsNotEmpty()
    @IsArray()
    documentsAndReport: { title: string, files: string[] };
    

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'asdf;lkjhvnaouds;fj;awlef',
        required : true
    })
    completedEffects : string
    
}

