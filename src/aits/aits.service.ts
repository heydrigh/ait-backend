import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ait } from './entities/ait.entity';
import { CreateAitDto } from './dtos/create-ait.dto';
import { UpdateAitDto } from './dtos/update-ait.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { PaginationResult } from 'src/interfaces/pagination';

@Injectable()
export class AitService {
  constructor(
    @InjectRepository(Ait)
    private readonly aitRepository: Repository<Ait>,
  ) {}

  async create(createAitDto: CreateAitDto): Promise<Ait> {
    const ait = this.aitRepository.create(createAitDto);
    return this.aitRepository.save(ait);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginationResult<Ait>> {
    const { page = 1, limit = 10 } = paginationDto;
    const [data, total] = await this.aitRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Ait> {
    return this.aitRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateAitDto: UpdateAitDto): Promise<Ait> {
    const ait = await this.findOne(id);
    const updatedait = { ...ait, ...updateAitDto };
    return this.aitRepository.save(updatedait);
  }

  async remove(id: string): Promise<void> {
    await this.aitRepository.delete(id);
  }
}
