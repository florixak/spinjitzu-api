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
import { CharactersService } from './characters.service';
import { CharacterQueryDto } from './dto/character-query.dto';
import { CharacterDetailDto } from './dto/character-response.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @PublicRead()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiQuery({ type: CharacterQueryDto })
  @ApiResponse({ status: 200, description: 'Characters fetched successfully' })
  findAll(@Query() query: CharacterQueryDto) {
    return this.charactersService.findAll(query);
  }

  @Get(':id')
  @PublicRead()
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
  @AdminWrite()
  @ApiOperation({ summary: 'Create a new character' })
  @ApiBody({ type: CreateCharacterDto, description: 'Character data' })
  @ApiResponse({
    status: 201,
    description: 'Character created successfully',
    type: CharacterDetailDto,
  })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(':id')
  @AdminWrite()
  @ApiOperation({ summary: 'Update a character by id' })
  @ApiBody({ type: UpdateCharacterDto, description: 'Character data' })
  @ApiResponse({
    status: 200,
    description: 'Character updated successfully',
    type: CharacterDetailDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AdminWrite()
  @ApiOperation({ summary: 'Delete a character by id' })
  @ApiNoContentResponse({ description: 'Character deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.remove(id);
  }
}
