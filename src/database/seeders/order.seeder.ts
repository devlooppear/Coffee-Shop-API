import { PrismaClient } from "@prisma/client";
import { orderFactory } from "../factories/order.factory";
import { faker } from "@faker-js/faker";

export async function seedOrders(prisma: PrismaClient) {
  try {
    const numberOfOrders = 10;
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
      data: orders,
    });

    console.log('Orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
}
