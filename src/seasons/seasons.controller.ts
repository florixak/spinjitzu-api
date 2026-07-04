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
import { AdminWrite } from 'src/common/decorators/admin-write.decorator';
import { PublicRead } from 'src/common/decorators/public-read.decorator';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeasonQueryDto } from './dto/season-query.dto';
import { SeasonDetailDto } from './dto/season-response.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonsService } from './seasons.service';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  @PublicRead()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiQuery({ type: SeasonQueryDto })
  @ApiResponse({ status: 200, description: 'Seasons fetched successfully' })
  findAll(@Query() query: SeasonQueryDto) {
    return this.seasonsService.findAll(query);
  }

  @Post()
  @AdminWrite()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiBody({ type: CreateSeasonDto, description: 'Season data' })
  @ApiResponse({
    status: 201,
    description: 'Season created successfully',
    type: SeasonDetailDto,
  })
  create(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonDetailDto> {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get(':id')
  @PublicRead()
  @ApiOperation({ summary: 'Get a season by id' })
  @ApiResponse({
    status: 200,
    description: 'Season fetched successfully',
    type: SeasonDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SeasonDetailDto> {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  @AdminWrite()
  @ApiOperation({ summary: 'Update a season by id' })
  @ApiBody({ type: UpdateSeasonDto, description: 'Season data' })
  @ApiResponse({
    status: 200,
    description: 'Season updated successfully',
    type: SeasonDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ): Promise<SeasonDetailDto> {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AdminWrite()
  @ApiOperation({ summary: 'Delete a season by id' })
  @ApiNoContentResponse({ description: 'Season deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.seasonsService.remove(id);
  }
}
