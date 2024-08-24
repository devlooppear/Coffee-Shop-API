import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateEmployeeReviewDto {
  @ApiProperty({ description: 'ID do funcionário que está sendo avaliado' })
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Nome do revisor da avaliação' })
  @IsString()
  @IsNotEmpty()
  reviewerName: string;

  @ApiProperty({ description: 'Classificação da avaliação (de 1 a 5)' })
  @IsInt()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Comentários adicionais sobre a avaliação',
    required: false,
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ description: 'Data da avaliação' })
  @IsDate()
  @IsNotEmpty()
  reviewDate: Date;
}
