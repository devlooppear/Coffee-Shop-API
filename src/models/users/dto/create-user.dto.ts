import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    maxLength: 255,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    maxLength: 255,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role ID associated with the user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
