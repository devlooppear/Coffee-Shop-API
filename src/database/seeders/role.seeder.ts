import { PrismaClient } from '@prisma/client';
import { roleFactory } from '../factories/role.factory';

export async function seedRoles(prisma: PrismaClient) {
  const numberOfRoles = 3;

  const roles = await Promise.all(
    Array.from({ length: numberOfRoles }, (_, index) => roleFactory(index))
  );

  await prisma.role.createMany({
    data: roles,
  });

  console.log('Roles seeded successfully');
}
