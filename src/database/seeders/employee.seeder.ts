import { PrismaClient } from '@prisma/client';
import { employeeFactory } from '../factories/employee.factory';

export async function seedEmployees(prisma: PrismaClient) {
  const numberOfEmployees = 10;
  const employees = Array.from({ length: numberOfEmployees }, employeeFactory);

  await prisma.employee.createMany({
    data: employees,
  });

  console.log('Employees seeded successfully');
}
