import { PrismaClient } from '@prisma/client';
import { seedEmployees } from './employee.seeder';
import { seedCustomers } from './customer.seeder';
import { seedCategories } from './category.seeder';
import { seedProducts } from './product.seeder';
import { seedOrders } from './order.seeder';
import { seedOrderItems } from './order-item.seeder';
import { seedEmployeeReviews } from './employee-review.seeder';
import { seedRoles } from './role.seeder';
import { seedPermissions } from './permission.seeder';
import { seedUsers } from './user.seeder';
import { seedRolePermissions } from './role-permission.seeder';
import { seedEmployeeRoles } from './employee-role.seeder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await seedEmployees(prisma);
    await seedCustomers(prisma);
    await seedCategories(prisma);
    await seedProducts(prisma);
    await seedOrders(prisma);
    await seedOrderItems(prisma);
    await seedEmployeeReviews(prisma);
    await seedRoles(prisma);
    await seedPermissions(prisma);
    await seedUsers(prisma);
    await seedRolePermissions(prisma);
    await seedEmployeeRoles(prisma);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
