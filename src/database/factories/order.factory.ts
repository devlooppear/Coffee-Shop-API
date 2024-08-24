import { faker } from '@faker-js/faker';
import { PrismaClient, OrderStatus } from '@prisma/client';

export interface Order {
  customerId: number;
  employeeId: number;
  totalAmount: number;
  status: OrderStatus; 
  orderDate: Date;
}

export const orderFactory = (
  customerId: number,
  employeeId: number,
): Order => ({
  customerId,
  employeeId,
  totalAmount: parseFloat((Math.random() * (1000 - 10) + 10).toFixed(2)),
  status: faker.helpers.arrayElement(Object.values(OrderStatus)) as OrderStatus,
  orderDate: generateRecentDate(365),
});

const generateRecentDate = (days: number): Date => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * days));
  return pastDate;
};

export async function seedOrders(prisma: PrismaClient, numberOfOrders: number) {
  try {
    const customers = await prisma.customer.findMany({ select: { id: true } });
    const employees = await prisma.employee.findMany({ select: { id: true } });

    if (customers.length === 0 || employees.length === 0) {
      console.log('No customers or employees found. Skipping seeding orders.');
      return;
    }

    const orders = Array.from({ length: numberOfOrders }, () => {
      const randomCustomer = faker.helpers.arrayElement(customers);
      const randomEmployee = faker.helpers.arrayElement(employees);
      return orderFactory(randomCustomer.id, randomEmployee.id);
    });

    await prisma.order.createMany({
      data: orders, // Tipagem corrigida para ser compatível com Prisma.OrderCreateManyInput[]
    });

    console.log('Orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
}
