import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateNgoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    confirmPassword: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    }) 
    country: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    nationalId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    establishmentYear: string;


    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    activityField: string[];


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    postal: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    website: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    areaAndScope: string[];


    @IsNotEmpty()
    @ApiProperty({
        example: { has: true, describtion: 'its describtion' },
        required: true
    })
    specificCultureGroup: { has: boolean, descibtion: string };

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    specificActiveAreas: string[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    areaOfExpertise: string[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    populationConcentration: string[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    group: string[];

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    additionalInformation: string;


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { instagram: 'insta', telegram: 'its telegram', linkedIn: 'its linkedin' },
        required: true
    })
    socialMedia: { instagram: string, telegram: string, linkedIn: string };


    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    cooperation: boolean;


    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: { has: false, description: 'its describtion' },
        required: true
    })
    license: { has: boolean, desciption: Boolean };


    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty({
    //     example: false,
    //     required: true
    // })
    // issuedBy: boolean;

    @IsString()
    @ApiProperty({
        example: true,
        required: true,
    })
    expiryDate: string;

    @IsNotEmpty()
    @IsObject()
    @ApiProperty({
        example: {},
        required: true
    })
    publish: {status : number , description : string};

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: [''],
        required: true
    })
    documents: string[]
}
