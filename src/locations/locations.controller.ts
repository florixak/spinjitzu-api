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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationQueryDto } from './dto/location-query.dto';
import { LocationDetailDto } from './dto/location-response.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiQuery({ type: LocationQueryDto })
  @ApiResponse({ status: 200, description: 'Locations fetched successfully' })
  findAll(@Query() query: LocationQueryDto) {
    return this.locationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by id' })
  @ApiResponse({
    status: 200,
    description: 'Location fetched successfully',
    type: LocationDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<LocationDetailDto> {
    return this.locationsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto, description: 'Location data' })
  @ApiResponse({
    status: 201,
    description: 'Location created successfully',
    type: LocationDetailDto,
  })
  create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<LocationDetailDto> {
    return this.locationsService.create(createLocationDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a location by id' })
  @ApiBody({ type: UpdateLocationDto, description: 'Location data' })
  @ApiResponse({
    status: 200,
    description: 'Location updated successfully',
    type: LocationDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<LocationDetailDto> {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a location by id' })
  @ApiNoContentResponse({ description: 'Location deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.locationsService.remove(id);
  }
}
