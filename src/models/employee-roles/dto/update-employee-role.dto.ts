import { IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeRoleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  roleId?: number;
}
