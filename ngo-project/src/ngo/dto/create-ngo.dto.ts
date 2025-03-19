import { IsBoolean, IsNotEmpty, IsString } from "@nestjs/class-validator";
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
    passwod: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    confirmPassword : string;

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    city: string;

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
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    activityField: string;


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
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    areaAndScope: string;


    @IsNotEmpty()
    @ApiProperty({
        example: { has: true, describtion: 'its describtion' },
        required: true
    })
    specificCultureGroup: { has: boolean, descibtion: string };

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    specificActiveAreas: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    areaOfExpertise: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    PopulationConcentration: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    group: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'iranian ngo',
        required: true
    })
    additionalInformation: string;

    @IsNotEmpty()
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
    @ApiProperty({
        example: { has: false, describtion: 'its describtion' },
        required: true
    })
    license: { has: boolean, descibtion: Boolean };


    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: false,
        required: true
    })
    issuedBy: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: true,
        required: true
    })
    expiryDate: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: false,
        required: true
    })
    publish: boolean;
}
