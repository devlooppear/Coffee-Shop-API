import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Name of the customer', maxLength: 100 })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: 'Email of the customer', maxLength: 100 })
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({ description: 'Phone number of the customer', maxLength: 15, required: false })
  @IsOptional()
  @IsString()
  @Length(0, 15)
  phone_number?: string;

  @ApiProperty({ description: 'Address of the customer', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
