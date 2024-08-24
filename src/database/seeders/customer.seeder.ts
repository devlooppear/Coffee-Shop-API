import { PrismaClient } from '@prisma/client';
import { customerFactory } from '../factories/customer.factory';

export async function seedCustomers(prisma: PrismaClient) {
  const numberOfCustomers = 10;
  const customers = Array.from({ length: numberOfCustomers }, customerFactory);

  await prisma.customer.createMany({
    data: customers,
  });

  console.log('Customers seeded successfully');
}
