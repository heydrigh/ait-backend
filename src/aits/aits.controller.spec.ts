import { Test, TestingModule } from '@nestjs/testing';
import { AitController } from './aits.controller';
import { AitService } from './aits.service';
import { CreateAitDto } from './dtos/create-ait.dto';
import { UpdateAitDto } from './dtos/update-ait.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { Ait } from './entities/ait.entity';

const mockAit = {
  id: '1',
  placa_veiculo: 'ABC-1234',
  data_infracao: new Date('2023-05-25T14:30:00.000Z'),
  descricao: 'Speeding in a residential area',
  valor_multa: 150.75,
} satisfies Ait;

const mockAitService = {
  create: jest.fn().mockResolvedValue(mockAit),
  findAll: jest.fn().mockResolvedValue({ data: [mockAit], total: 1 }),
  findOne: jest.fn().mockResolvedValue(mockAit),
  update: jest.fn().mockResolvedValue(mockAit),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('AitController', () => {
  let controller: AitController;
  let service: AitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AitController],
      providers: [
        {
          provide: AitService,
          useValue: mockAitService,
        },
      ],
    }).compile();

    controller = module.get<AitController>(AitController);
    service = module.get<AitService>(AitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new AIT', async () => {
      const createAitDto: CreateAitDto = {
        placa_veiculo: 'ABC-1234',
        data_infracao: new Date('2023-05-25T14:30:00.000Z'),
        descricao: 'Speeding in a residential area',
        valor_multa: 150.75,
      };

      const result = await controller.create(createAitDto);
      expect(service.create).toHaveBeenCalledWith(createAitDto);
      expect(result).toEqual(mockAit);
    });
  });

  describe('findAll', () => {
    it('should return paginated AITs', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };

      const result = await controller.findAll(paginationDto);
      expect(service.findAll).toHaveBeenCalledWith(paginationDto);
      expect(result).toEqual({ data: [mockAit], total: 1 });
    });
  });

  describe('findOne', () => {
    it('should return a single AIT', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockAit);
    });
  });

  describe('update', () => {
    it('should update and return the AIT', async () => {
      const updateAitDto: UpdateAitDto = { descricao: 'Updated description' };

      const result = await controller.update('1', updateAitDto);
      expect(service.update).toHaveBeenCalledWith('1', updateAitDto);
      expect(result).toEqual(mockAit);
    });
  });

  describe('remove', () => {
    it('should remove the AIT', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
