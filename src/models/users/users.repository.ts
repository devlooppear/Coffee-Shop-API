import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import logger from 'winston.config';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<{ data: User }> {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
        include: { role: true },
      });
      return { data: newUser };
    } catch (error) {
      logger.error(`Failed to create user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: User[], totalCount: number }> {
    try {
      const [users, totalCount] = await Promise.all([
        this.prisma.user.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    role: true,
                  },
                },
                employees: true,
              },
            },
          },
        }),
        this.prisma.user.count(),
      ]);
      return { data: users, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve users: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: number): Promise<{ data: User }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: true,
              employees: true,
            },
          },
        },
      });
      if (!user) {
        logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { data: user };
    } catch (error) {
      logger.error(`Failed to retrieve user with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to retrieve user with ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ data: User }> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        include: {
          role: true,
        },
      });
      return { data: updatedUser };
    } catch (error) {
      logger.error(`Failed to update user with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to update user with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.user.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(`Failed to remove user with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to remove user with ID ${id}`,
      );
    }
  }
}
