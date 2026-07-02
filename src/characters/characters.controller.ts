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
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterQueryDto } from './dto/character-query.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { CharacterDetailDto } from './dto/character-response.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiQuery({ type: CharacterQueryDto })
  @ApiResponse({ status: 200, description: 'Characters fetched successfully' })
  findAll(@Query() query: CharacterQueryDto) {
    return this.charactersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a character by id' })
  @ApiResponse({
    status: 200,
    description: 'Character fetched successfully',
    type: CharacterDetailDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new character' })
  @ApiBody({ type: CreateCharacterDto, description: 'Character data' })
  @ApiResponse({ status: 201, description: 'Character created successfully' })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a character by id' })
  @ApiBody({ type: UpdateCharacterDto, description: 'Character data' })
  @ApiResponse({ status: 200, description: 'Character updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a character by id' })
  @ApiResponse({ status: 200, description: 'Character deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.remove(id);
  }
}
