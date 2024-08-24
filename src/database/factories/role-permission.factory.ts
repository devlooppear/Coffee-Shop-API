import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export interface RolePermissionFactory {
  roleId: number;
  permissionId: number;
}

export const rolePermissionFactory = async (
  prisma: PrismaClient,
  totalEntries: number,
): Promise<void> => {
  const roles = await prisma.role.findMany({ select: { id: true } });
  const permissions = await prisma.permission.findMany({
    select: { id: true },
  });

  if (roles.length === 0 || permissions.length === 0) {
    throw new Error('No roles or permissions found in the database.');
  }

  const roleIds = roles.map((role) => role.id);
  const permissionIds = permissions.map((permission) => permission.id);

  const rolePermissionsToCreate: RolePermissionFactory[] = [];

  for (let i = 0; i < totalEntries; i++) {
    const roleId = faker.helpers.arrayElement(roleIds);
    const permissionId = faker.helpers.arrayElement(permissionIds);

    rolePermissionsToCreate.push({ roleId, permissionId });
  }

  const uniqueRolePermissions = Array.from(
    new Set(rolePermissionsToCreate.map((rp) => JSON.stringify(rp))),
  ).map((rp) => JSON.parse(rp));

  await prisma.rolePermission.createMany({
    data: uniqueRolePermissions,
  });
};
