import { PrismaClient } from '@prisma/client';
import { orderItemFactory } from '../factories/order-item.factory';

export async function seedOrderItems(prisma: PrismaClient) {
  try {
    const numberOfOrderItems = 50;
    const orderItems = await Promise.all(
      Array.from({ length: numberOfOrderItems }, () =>
        orderItemFactory(prisma),
      ),
    );

    await prisma.orderItem.createMany({
      data: orderItems,
    });

    console.log('OrderItems seeded successfully');
  } catch (error) {
    console.error('Error seeding order items:', error);
  }
}
