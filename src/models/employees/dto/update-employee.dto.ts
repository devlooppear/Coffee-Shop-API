import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiProperty({ description: 'The name of the employee', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The position of the employee', required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ description: 'The email of the employee', example: 'employee@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The phone number of the employee', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'The address of the employee', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'The department of the employee', required: false })
  @IsString()
  @IsOptional()
  department?: string;
}
