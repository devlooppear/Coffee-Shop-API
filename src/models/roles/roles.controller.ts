import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesRepository: RolesRepository) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.rolesRepository.create(createRoleDto);
    return { data: result.data };
  }

  @Get()
  async findAll() {
    const result = await this.rolesRepository.findAll();
    return { data: result.data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.rolesRepository.findOne(+id);
    return { data: result.data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const result = await this.rolesRepository.update(+id, updateRoleDto);
    return { data: result.data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.rolesRepository.remove(+id);
    return { data: result.data };
  }
}
