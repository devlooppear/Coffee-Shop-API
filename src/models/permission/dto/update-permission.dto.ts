import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'READ_ONLY',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'A description of the permission',
    example: 'Permission to read data only',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
