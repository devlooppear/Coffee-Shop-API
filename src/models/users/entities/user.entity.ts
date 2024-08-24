import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: number;

  @ApiProperty({ description: 'Username of the user', example: 'johndoe' })
  username: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'ID of the role assigned to the user' })
  roleId: number;

  @ApiProperty({ description: 'Date when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the user was last updated' })
  updatedAt: Date;
}
