import { IsNotEmpty, IsString } from "@nestjs/class-validator";
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
        example : 'project example data',
        required : true
    })
    describtion: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    status: string;

    @IsNotEmpty()
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
    organazationName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    managerName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    managerEmail: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    managerPhone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    stakeHolder: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    goalAndAchievements: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    documentsAndReport: string;

    @IsNotEmpty()
    visualDocuments: string[];

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example : 'project example data',
        required : true
    })
    moreInformation: string;
}