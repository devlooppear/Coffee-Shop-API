import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    maxLength: 100,
    example: 'Admin',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Description of the role',
    maxLength: 255,
    required: false,
    example: 'Administrator with full access',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
