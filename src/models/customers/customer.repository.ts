import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import logger from 'winston.config';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<{ data: Customer }> {
    try {
      const newCustomer = await this.prisma.customer.create({
        data: createCustomerDto,
      });
      return { data: newCustomer };
    } catch (error) {
      logger.error(`Failed to create customer: ${error.message}`);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Customer[], totalCount: number }> {
    try {
      const [customers, totalCount] = await Promise.all([
        this.prisma.customer.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        this.prisma.customer.count(),
      ]);
      return { data: customers, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve customers: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

  async findOne(id: number): Promise<{ data: Customer }> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) {
        logger.warn(`Customer with ID ${id} not found`);
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return { data: customer };
    } catch (error) {
      logger.error(`Failed to retrieve customer with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to retrieve customer with ID ${id}`);
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<{ data: Customer }> {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
      return { data: updatedCustomer };
    } catch (error) {
      logger.error(`Failed to update customer with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update customer with ID ${id}`);
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.customer.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(`Failed to remove customer with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to remove customer with ID ${id}`);
    }
  }
}
