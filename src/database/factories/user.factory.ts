import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export interface User {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

export const userFactory = async (prisma: PrismaClient): Promise<User> => {
  const roles = await prisma.role.findMany({
    select: { id: true },
  });

  if (roles.length === 0) {
    throw new Error('No roles found in the database.');
  }

  const randomRole = faker.helpers.arrayElement(roles);

  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: randomRole.id,
  };

  await prisma.user.create({
    data: user,
  });

  return user;
};
