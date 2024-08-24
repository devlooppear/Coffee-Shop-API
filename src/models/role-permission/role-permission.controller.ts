import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolePermissionRepository } from './role-permission.repository';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from '@prisma/client';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(private readonly rolePermissionRepository: RolePermissionRepository) {}

  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionRepository.create(createRolePermissionDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
  ): Promise<{ data: RolePermission[], totalCount: number }> {
    return this.rolePermissionRepository.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionRepository.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this.rolePermissionRepository.update(+id, updateRolePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionRepository.remove(+id);
  }
}
