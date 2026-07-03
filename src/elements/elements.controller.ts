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
import { CreateElementDto } from './dto/create-element.dto';
import { ElementQueryDto } from './dto/element-query.dto';
import { ElementDetailDto } from './dto/element-response.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { ElementsService } from './elements.service';

@ApiTags('Elements')
@Controller('elements')
export class ElementsController {
  constructor(private readonly elementsService: ElementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all elements' })
  @ApiQuery({ type: ElementQueryDto })
  @ApiResponse({ status: 200, description: 'Elements fetched successfully' })
  findAll(@Query() query: ElementQueryDto) {
    return this.elementsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an element by id' })
  @ApiResponse({
    status: 200,
    description: 'Element fetched successfully',
    type: ElementDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ElementDetailDto> {
    return this.elementsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new element' })
  @ApiBody({ type: CreateElementDto, description: 'Element data' })
  @ApiResponse({
    status: 201,
    description: 'Element created successfully',
    type: ElementDetailDto,
  })
  create(
    @Body() createElementDto: CreateElementDto,
  ): Promise<ElementDetailDto> {
    return this.elementsService.create(createElementDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an element by id' })
  @ApiBody({ type: UpdateElementDto, description: 'Element data' })
  @ApiResponse({
    status: 200,
    description: 'Element updated successfully',
    type: ElementDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateElementDto: UpdateElementDto,
  ): Promise<ElementDetailDto> {
    return this.elementsService.update(id, updateElementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an element by id' })
  @ApiNoContentResponse({ description: 'Element deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.elementsService.remove(id);
  }
}
