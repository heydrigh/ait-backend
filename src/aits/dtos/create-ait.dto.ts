import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber, Min } from 'class-validator';

export class CreateAitDto {
  @ApiProperty({ description: 'Vehicle license plate', example: 'ABC-1234' })
  @IsString()
  @IsNotEmpty()
  placa_veiculo: string;

  @ApiProperty({
    description: 'Date and time of the infraction',
    example: '2023-05-25T14:30:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  data_infracao: Date;

  @ApiProperty({
    description: 'Description of the infraction',
    example: 'Speeding in a residential area',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Fine amount in decimal', example: 150.75 })
  @IsNumber()
  @Min(0)
  valor_multa: number;
}
