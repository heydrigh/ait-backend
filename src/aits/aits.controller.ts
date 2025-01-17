import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AitService } from './aits.service';
import { CreateAitDto } from './dtos/create-ait.dto';
import { Ait } from './entities/ait.entity';
import { UpdateAitDto } from './dtos/update-ait.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationResult } from 'src/interfaces/pagination';

@ApiTags('AITs')
@Controller('aits')
export class AitController {
  constructor(private readonly aitService: AitService) {}

  @ApiOperation({ summary: 'Create a new AIT' })
  @ApiResponse({
    status: 201,
    description: 'The AIT has been successfully created.',
    type: Ait,
  })
  @Post()
  create(@Body() data: CreateAitDto): Promise<Ait> {
    return this.aitService.create(data);
  }

  @ApiOperation({ summary: 'Retrieve all AITs with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of AITs',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/Ait' } },
        total: { type: 'number' },
      },
    },
  })
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResult<Ait>> {
    return this.aitService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Update an AIT by ID' })
  @ApiResponse({ status: 200, description: 'The updated AIT', type: Ait })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAitDto): Promise<Ait> {
    return this.aitService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete an AIT by ID' })
  @ApiResponse({ status: 204, description: 'AIT successfully deleted' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.aitService.remove(id);
  }

  @ApiOperation({ summary: 'Process and download AITs as a CSV file' })
  @Post('process')
  async process(): Promise<{ message: string }> {
    await this.aitService.process();
    return { message: 'AIT data sent to the queue' };
  }

  @ApiOperation({ summary: 'Retrieve a single AIT by ID' })
  @ApiResponse({ status: 200, description: 'The AIT details', type: Ait })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ait> {
    return this.aitService.findOne(id);
  }
}
