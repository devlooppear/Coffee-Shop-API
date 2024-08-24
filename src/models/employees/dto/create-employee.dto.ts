import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Name of the employee' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email of the employee' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the employee', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Position of the employee', required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ description: 'Password of the employee' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
