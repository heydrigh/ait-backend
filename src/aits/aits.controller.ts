import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AitService } from './aits.service';
import { CreateAitDto } from './dto/create-ait.dto';
import { Ait } from './entities/ait.entity';
import { UpdateAitDto } from './dto/update-ait.dto';

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

  @ApiOperation({ summary: 'Retrieve all AITs' })
  @ApiResponse({ status: 200, description: 'List of all AITs', type: [Ait] })
  @Get()
  findAll(): Promise<Ait[]> {
    return this.aitService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single AIT by ID' })
  @ApiResponse({ status: 200, description: 'The AIT details', type: Ait })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ait> {
    return this.aitService.findOne(id);
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
}
