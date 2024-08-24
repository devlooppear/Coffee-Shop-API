import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
