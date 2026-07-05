import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminWrite } from '../common/decorators/admin-write.decorator';
import { PublicRead } from '../common/decorators/public-read.decorator';
import { CreateRealmDto } from './dto/create-realm.dto';
import { RealmQueryDto } from './dto/realm-query.dto';
import { RealmDetailDto } from './dto/realm-response.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';
import { RealmsService } from './realms.service';

@ApiTags('Realms')
@Controller('realms')
export class RealmsController {
  constructor(private readonly realmsService: RealmsService) {}

  @Get()
  @PublicRead()
  @ApiOperation({ summary: 'Get all realms' })
  @ApiQuery({ type: RealmQueryDto })
  @ApiResponse({ status: 200, description: 'Realms fetched successfully' })
  findAll(@Query() query: RealmQueryDto) {
    return this.realmsService.findAll(query);
  }

  @Get(':id')
  @PublicRead()
  @ApiOperation({ summary: 'Get a realm by id' })
  @ApiResponse({
    status: 200,
    description: 'Realm fetched successfully',
    type: RealmDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RealmDetailDto> {
    return this.realmsService.findOne(id);
  }

  @Post()
  @AdminWrite()
  @ApiOperation({ summary: 'Create a new realm' })
  @ApiBody({ type: CreateRealmDto, description: 'Realm data' })
  @ApiResponse({
    status: 201,
    description: 'Realm created successfully',
    type: RealmDetailDto,
  })
  create(@Body() createRealmDto: CreateRealmDto): Promise<RealmDetailDto> {
    return this.realmsService.create(createRealmDto);
  }

  @Patch(':id')
  @AdminWrite()
  @ApiOperation({ summary: 'Update a realm by id' })
  @ApiBody({ type: UpdateRealmDto, description: 'Realm data' })
  @ApiResponse({
    status: 200,
    description: 'Realm updated successfully',
    type: RealmDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRealmDto: UpdateRealmDto,
  ): Promise<RealmDetailDto> {
    return this.realmsService.update(id, updateRealmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AdminWrite()
  @ApiOperation({ summary: 'Delete a realm by id' })
  @ApiNoContentResponse({ description: 'Realm deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.realmsService.remove(id);
  }
}
