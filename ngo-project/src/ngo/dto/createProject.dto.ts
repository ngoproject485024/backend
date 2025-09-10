import { IsArray, IsNotEmpty, IsObject, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createProject {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    startDate: string;

    // // @IsNotEmpty()
    // @IsString()
    // @ApiProperty({
    //     example : 'project example data',
    //     required : true
    // })
    // endDate: string;

    @IsString()
    otherGoalAndAchievements : string


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    description: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    status: string[];

    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example : {country : 'iran' , city : 'tehran'}
    })
    location: { country: string, city: string };

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    organizationName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    projectManagerName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    projectManagerEmail: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    projectManagerPhone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        // required : true
    })
    colleaguesAndStakeholders: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    goalAndAchievements: string[];

    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    documentsAndReport: {title : string , files : string[]};

    @IsNotEmpty()
    @IsArray()
    visualDocuments: {title : string , files : string[]}[];


    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    moreInformation: string;
}