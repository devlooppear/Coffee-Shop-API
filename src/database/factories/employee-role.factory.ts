import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export interface EmployeeRole {
  employeeId: number;
  roleId: number;
}

export const employeeRoleFactory = async (
  prisma: PrismaClient,
): Promise<EmployeeRole> => {
  const employees = await prisma.employee.findMany({ select: { id: true } });
  const roles = await prisma.role.findMany({ select: { id: true } });

  if (employees.length === 0 || roles.length === 0) {
    throw new Error('No employees or roles found to create EmployeeRoles.');
  }

  const randomEmployee = faker.helpers.arrayElement(employees);
  const randomRole = faker.helpers.arrayElement(roles);

  const employeeRole = {
    employeeId: randomEmployee.id,
    roleId: randomRole.id,
  };

  return employeeRole;
};
