import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({
    description: 'Identifier of the associated role',
    example: 1, 
  })
  @IsNotEmpty()
  @IsNumber() 
  roleId: number;

  @ApiProperty({
    description: 'Identifier of the associated permission',
    example: 2, 
  })
  @IsNotEmpty()
  @IsNumber() 
  permissionId: number;
}
