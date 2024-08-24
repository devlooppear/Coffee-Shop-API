import { ApiProperty } from '@nestjs/swagger';

export class RolePermission {
  @ApiProperty({
    description: 'Unique identifier for the role permission',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Identifier of the associated role',
    example: 'role-123',
  })
  roleId: number;

  @ApiProperty({
    description: 'Identifier of the associated permission',
    example: 'permission-456',
  })
  permissionId: number;
}
