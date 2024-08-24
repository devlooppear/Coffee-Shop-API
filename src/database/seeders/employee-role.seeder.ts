import { PrismaClient } from '@prisma/client';
import { employeeRoleFactory } from '../factories/employee-role.factory';

export async function seedEmployeeRoles(
  prisma: PrismaClient,
) {
  try {
    const numberOfEntries = 10;
    const employeeRoles = await Promise.all(
      Array.from({ length: numberOfEntries }, () =>
        employeeRoleFactory(prisma),
      ),
    );

    await prisma.employeeRole.createMany({
      data: employeeRoles,
    });

    console.log(
      `Employee roles seeded successfully.`,
    );
  } catch (error) {
    console.error('Error seeding employee roles:', error);
  }
}
