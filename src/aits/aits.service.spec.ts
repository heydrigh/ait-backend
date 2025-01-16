import { Test, TestingModule } from '@nestjs/testing';
import { AitService } from './aits.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ait } from './entities/ait.entity';
import { CreateAitDto } from './dtos/create-ait.dto';
import { UpdateAitDto } from './dtos/update-ait.dto';
import { PaginationDto } from '../dtos/pagination.dto';

const mockAit = {
  id: '1',
  placa_veiculo: 'ABC-1234',
  data_infracao: new Date('2023-05-25T14:30:00.000Z'),
  descricao: 'Speeding in a residential area',
  valor_multa: 150.75,
};

const mockAitRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockAit),
  findAndCount: jest.fn().mockResolvedValue([[mockAit], 1]),
  findOneOrFail: jest.fn().mockResolvedValue(mockAit),
  update: jest.fn().mockResolvedValue(mockAit),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('AitService', () => {
  let service: AitService;
  let repository: Repository<Ait>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AitService,
        {
          provide: getRepositoryToken(Ait),
          useValue: mockAitRepository,
        },
      ],
    }).compile();

    service = module.get<AitService>(AitService);
    repository = module.get<Repository<Ait>>(getRepositoryToken(Ait));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an AIT', async () => {
      const createAitDto: CreateAitDto = {
        placa_veiculo: 'ABC-1234',
        data_infracao: new Date('2023-05-25T14:30:00.000Z'),
        descricao: 'Speeding in a residential area',
        valor_multa: 150.75,
      };

      const result = await service.create(createAitDto);
      expect(repository.create).toHaveBeenCalledWith(createAitDto);
      expect(repository.save).toHaveBeenCalledWith(createAitDto);
      expect(result).toEqual(mockAit);
    });
  });

  describe('findAll', () => {
    it('should return paginated AITs', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      const result = await service.findAll(paginationDto);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({ data: [mockAit], total: 1 });
    });
  });

  describe('findOne', () => {
    it('should return a single AIT', async () => {
      const result = await service.findOne('1');
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockAit);
    });
  });

  describe('update', () => {
    it('should update and return an AIT', async () => {
      const updateAitDto: UpdateAitDto = { descricao: 'Updated description' };
      const result = await service.update('1', updateAitDto);

      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockAit,
        ...updateAitDto,
      });
      expect(result).toEqual(mockAit);
    });
  });

  describe('remove', () => {
    it('should delete an AIT', async () => {
      await service.remove('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
