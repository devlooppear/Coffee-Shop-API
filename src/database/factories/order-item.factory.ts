import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export interface CreateOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export const orderItemFactory = async (
  prisma: PrismaClient,
): Promise<CreateOrderItem> => {
  const orders = await prisma.order.findMany({ select: { id: true } });
  const products = await prisma.product.findMany({ select: { id: true, price: true } });

  if (orders.length === 0 || products.length === 0) {
    throw new Error('No orders or products found in the database.');
  }

  const randomOrder = faker.helpers.arrayElement(orders);
  const randomProduct = faker.helpers.arrayElement(products);

  const quantity = Math.floor(Math.random() * 5) + 1;
  const totalPrice = parseFloat((randomProduct.price * quantity).toFixed(2));

  return {
    orderId: randomOrder.id,
    productId: randomProduct.id,
    quantity,
    price: totalPrice, 
  };
};