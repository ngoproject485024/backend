import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsEducationDto } from './create-events-education.dto';

export class UpdateEventsEducationDto extends PartialType(CreateEventsEducationDto) {}
