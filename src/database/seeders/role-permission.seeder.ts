import { PrismaClient } from '@prisma/client';
import { rolePermissionFactory } from '../factories/role-permission.factory';

export async function seedRolePermissions(prisma: PrismaClient) {
  try {
    const numberOfEntries = 20;

    await rolePermissionFactory(prisma, numberOfEntries);

    console.log('Role-Permission entries seeded successfully');
  } catch (error) {
    console.error('Error seeding role-permission entries:', error);
  }
}
