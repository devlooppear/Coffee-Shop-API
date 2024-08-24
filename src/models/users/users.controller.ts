import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.usersRepository.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Res() res: Response
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page or pageSize parameters');
    }

    try {
      const result = await this.usersRepository.findAll(pageNumber, pageSizeNumber);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw new InternalServerErrorException('Failed to retrieve users:' + error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersRepository.findOne(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error retrieving user with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to retrieve user with ID ${id}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.usersRepository.update(+id, updateUserDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to update user with ID ${id}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersRepository.remove(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error removing user with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to remove user with ID ${id}`);
    }
  }
}
