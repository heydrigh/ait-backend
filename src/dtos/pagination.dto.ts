import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit?: number;
}
