import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export interface Permission {
  name: string;
  description?: string;
}

export const permissionFactory = async (
  prisma: PrismaClient,
  totalPermissions: number,
): Promise<void> => {
  const predefinedPermissions = [
    { name: 'View Dashboard', description: 'Allows viewing the dashboard.' },
    { name: 'Edit Profile', description: 'Allows editing the user profile.' },
    { name: 'Manage Users', description: 'Allows managing user accounts.' },
    { name: 'View Reports', description: 'Allows viewing various reports.' },
    {
      name: 'Export Data',
      description: 'Allows exporting data to CSV or Excel.',
    },
    { name: 'Create Projects', description: 'Allows creating new projects.' },
    { name: 'Edit Projects', description: 'Allows editing existing projects.' },
    { name: 'Delete Projects', description: 'Allows deleting projects.' },
    {
      name: 'Manage Roles',
      description: 'Allows managing user roles and permissions.',
    },
    {
      name: 'Manage Settings',
      description: 'Allows changing application settings.',
    },
  ];

  const permissionsToCreate = [];

  for (let i = 0; i < totalPermissions; i++) {
    if (i < predefinedPermissions.length) {
      permissionsToCreate.push(predefinedPermissions[i]);
    } else {
      permissionsToCreate.push({
        name: faker.lorem.words(3),
        description: faker.lorem.sentence(),
      });
    }
  }

  await prisma.permission.createMany({
    data: permissionsToCreate,
  });
};
