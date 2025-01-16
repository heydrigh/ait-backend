import { PartialType } from '@nestjs/swagger';
import { CreateAitDto } from './create-ait.dto';

export class UpdateAitDto extends PartialType(CreateAitDto) {}
