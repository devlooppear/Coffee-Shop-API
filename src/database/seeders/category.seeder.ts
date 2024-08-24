import { PrismaClient } from '@prisma/client';
import { categoryFactory } from '../factories/category.factory';

export async function seedCategories(prisma: PrismaClient) {
  const numberOfCategories = 10;

  const categories = Array.from({ length: numberOfCategories }, categoryFactory);

  try {
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true, 
    });

    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}
