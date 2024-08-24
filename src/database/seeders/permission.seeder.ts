import { PrismaClient } from '@prisma/client';
import { permissionFactory } from '../factories/permission.factory';

export async function seedPermissions(prisma: PrismaClient) {
  try {
    const numberOfPermissions = 10;

    await permissionFactory(prisma, numberOfPermissions);

    console.log('Permissions seeded successfully');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  }
}
