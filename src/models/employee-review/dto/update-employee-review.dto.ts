import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateEmployeeReviewDto {
  @ApiProperty({ description: 'ID do funcionário que está sendo avaliado', required: false })
  @IsOptional()
  @IsInt()
  employeeId?: number;

  @ApiProperty({ description: 'Nome do revisor da avaliação', required: false })
  @IsOptional()
  @IsString()
  reviewerName?: string;

  @ApiProperty({ description: 'Classificação da avaliação (de 1 a 5)', required: false })
  @IsOptional()
  @IsInt()
  rating?: number;

  @ApiProperty({ description: 'Comentários adicionais sobre a avaliação', required: false })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ description: 'Data da avaliação', required: false })
  @IsOptional()
  @IsDate()
  reviewDate?: Date;
}
