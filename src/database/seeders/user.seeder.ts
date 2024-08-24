import { PrismaClient } from '@prisma/client';
import { userFactory } from '../factories/user.factory';

export async function seedUsers(prisma: PrismaClient) {
  try {
    const numberOfUsers = 25;

    await Promise.all(
      Array.from({ length: numberOfUsers }, () => userFactory(prisma)),
    );

    console.log('Users seeded successfully:');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
