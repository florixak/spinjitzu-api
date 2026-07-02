import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RealmsService } from './realms.service';
import { CreateRealmDto } from './dto/create-realm.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';
import { RealmQueryDto } from './dto/realm-query.dto';
import { RealmDetailDto, RealmListItemDto } from './dto/realm-response.dto';
import { ApiSuccessResponseWithPagination } from 'src/common/interfaces/api-response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Realms')
@Controller('realms')
export class RealmsController {
  constructor(private readonly realmsService: RealmsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new realm' })
  @ApiBody({ type: CreateRealmDto, description: 'Realm data' })
  @ApiResponse({
    status: 201,
    description: 'Realm created successfully',
    type: RealmListItemDto,
  })
  create(@Body() createRealmDto: CreateRealmDto) {
    return this.realmsService.create(createRealmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all realms' })
  @ApiResponse({
    status: 200,
    description: 'Realms fetched successfully',
    type: [RealmListItemDto],
  })
  findAll(
    @Query() query: RealmQueryDto,
  ): Promise<ApiSuccessResponseWithPagination<RealmListItemDto[]>> {
    return this.realmsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a realm by id' })
  @ApiResponse({
    status: 200,
    description: 'Realm fetched successfully',
    type: RealmDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RealmDetailDto> {
    return this.realmsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a realm by id' })
  @ApiNoContentResponse({ description: 'Realm deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.realmsService.remove(id);
  }
}
