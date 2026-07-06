import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

const SORTABLE_FIELDS = ['name'] as const;

export class ElementQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Partial, case-insensitive match on name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: SORTABLE_FIELDS, default: 'name' })
  @IsOptional()
  @IsIn(SORTABLE_FIELDS, {
    message: `sortBy must be one of: ${SORTABLE_FIELDS.join(', ')}`,
  })
  declare sortBy?: (typeof SORTABLE_FIELDS)[number];
}
