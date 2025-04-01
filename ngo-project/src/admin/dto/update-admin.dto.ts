import { PartialType } from '@nestjs/swagger';
import { createAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(createAdminDto) {}
