import { PrismaClient } from '@prisma/client';
import { productFactory } from '../factories/product.factory';

export async function seedProducts(prisma: PrismaClient) {
  const numberOfProducts = 50;
  const products = await Promise.all(
    Array.from({ length: numberOfProducts }, () => productFactory(prisma))
  );

  await prisma.product.createMany({
    data: products,
  });

  console.log('Products seeded successfully');
}
