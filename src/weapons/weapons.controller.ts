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
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponQueryDto } from './dto/weapon-query.dto';
import { WeaponDetailDto } from './dto/weapon-response.dto';
import { WeaponsService } from './weapons.service';

@ApiTags('Weapons')
@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get()
  @PublicRead()
  @ApiOperation({ summary: 'Get all weapons' })
  @ApiQuery({ type: WeaponQueryDto })
  @ApiResponse({ status: 200, description: 'Weapons fetched successfully' })
  findAll(@Query() query: WeaponQueryDto) {
    return this.weaponsService.findAll(query);
  }

  @Get(':id')
  @PublicRead()
  @ApiOperation({ summary: 'Get a weapon by id' })
  @ApiResponse({
    status: 200,
    description: 'Weapon fetched successfully',
    type: WeaponDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WeaponDetailDto> {
    return this.weaponsService.findOne(id);
  }

  @Post()
  @AdminWrite()
  @ApiOperation({ summary: 'Create a new weapon' })
  @ApiBody({ type: CreateWeaponDto, description: 'Weapon data' })
  @ApiResponse({
    status: 201,
    description: 'Weapon created successfully',
    type: WeaponDetailDto,
  })
  create(@Body() createWeaponDto: CreateWeaponDto): Promise<WeaponDetailDto> {
    return this.weaponsService.create(createWeaponDto);
  }

  @Patch(':id')
  @AdminWrite()
  @ApiOperation({ summary: 'Update a weapon by id' })
  @ApiBody({ type: UpdateWeaponDto, description: 'Weapon data' })
  @ApiResponse({
    status: 200,
    description: 'Weapon updated successfully',
    type: WeaponDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWeaponDto: UpdateWeaponDto,
  ): Promise<WeaponDetailDto> {
    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AdminWrite()
  @ApiOperation({ summary: 'Delete a weapon by id' })
  @ApiNoContentResponse({ description: 'Weapon deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.weaponsService.remove(id);
  }
}
