import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty({ description: 'Unique identifier for the role' })
  id: number;

  @ApiProperty({ description: 'Name of the role', example: 'Admin' })
  name: string;

  @ApiProperty({ description: 'Description of the role', required: false })
  description?: string;

  @ApiProperty({ description: 'Date when the role was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the role was last updated' })
  updatedAt: Date;
}
