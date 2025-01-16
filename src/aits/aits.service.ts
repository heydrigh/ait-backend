import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ait } from './entities/ait.entity';
import { CreateAitDto } from './dto/create-ait.dto';
import { UpdateAitDto } from './dto/update-ait.dto';

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

  async findAll(): Promise<Ait[]> {
    return this.aitRepository.find();
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
