import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsDateString
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username of the user',
    maxLength: 255,
    example: 'john_doe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
    maxLength: 255,
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    minLength: 6,
    example: 'newpassword123',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Role ID associated with the user',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  roleId?: number;

  @ApiPropertyOptional({
    description: 'Creation date of the user',
    type: 'string',
    format: 'date-time',
    example: '2024-08-01T12:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Last update date of the user',
    type: 'string',
    format: 'date-time',
    example: '2024-08-01T12:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
