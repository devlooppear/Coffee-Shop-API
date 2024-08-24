import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionDto {
  @ApiProperty({ required: false }) 
  @IsOptional() 
  @IsString()
  roleId?: number;
  @ApiProperty({ required: false }) 
  @IsOptional() 
  @IsString()
  permissionId?: number;}
