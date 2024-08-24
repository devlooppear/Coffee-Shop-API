import { ApiProperty } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({
    description: 'Identificador único da permissão',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome da permissão',
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da permissão',
    example: 'Permissão para acessar todas as áreas administrativas',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Data de criação da permissão',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Data da última atualização da permissão',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  updatedAt?: Date;
}
