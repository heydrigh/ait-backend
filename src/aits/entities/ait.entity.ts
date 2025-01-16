import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('aits')
export class Ait {
  @ApiProperty({
    description: 'Unique identifier for the AIT',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Vehicle license plate', example: 'ABC-1234' })
  @Column({ type: 'varchar', length: 20 })
  placa_veiculo: string;

  @ApiProperty({
    description: 'Date and time of the infraction',
    example: '2023-05-25T14:30:00.000Z',
  })
  @Column({ type: 'timestamptz' })
  data_infracao: Date;

  @ApiProperty({
    description: 'Description of the infraction',
    example: 'Speeding in a residential area',
  })
  @Column({ type: 'text' })
  descricao: string;

  @ApiProperty({ description: 'Fine amount in decimal', example: 150.75 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_multa: number;
}
