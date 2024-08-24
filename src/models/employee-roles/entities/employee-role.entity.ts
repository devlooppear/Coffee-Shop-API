import { ApiProperty } from '@nestjs/swagger';

export class EmployeeRole {
  @ApiProperty()
  id: number;

  @ApiProperty()
  employeeId: number;

  @ApiProperty()
  roleId: number;

  @ApiProperty({ type: () => Date })
  createdAt: Date;

  @ApiProperty({ type: () => Date })
  updatedAt: Date;
}
