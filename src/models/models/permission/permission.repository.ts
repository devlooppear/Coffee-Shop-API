import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.prisma.permission.create({
      data: createPermissionDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Permission[]; total: number }> {
    const [permissions, total] = await this.prisma.$transaction([
      this.prisma.permission.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.permission.count(),
    ]);

    return {
      data: permissions,
      total,
    };
  }

  async findOne(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return this.prisma.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  async remove(id: number): Promise<Permission> {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
