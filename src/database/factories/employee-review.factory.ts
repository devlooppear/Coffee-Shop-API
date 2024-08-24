import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export interface EmployeeReview {
  employeeId: number;
  reviewerName: string;
  rating: number;
  comments?: string;
  reviewDate: Date;
}

const predefinedComments = [
  'Exceptional performance throughout the review period.',
  'Consistently delivers high-quality work and meets all deadlines.',
  'Displays a strong work ethic and leadership skills.',
  'Shows great initiative but needs to work on time management.',
  'Good teamwork and communication skills. Keep up the good work!',
  'Needs to improve attention to detail and follow-up on tasks.',
  'Has made significant progress over the past few months.',
  'Demonstrates excellent problem-solving abilities and creativity.',
  'Reliable and dependable with a positive attitude.',
  'Struggles with meeting deadlines and requires improvement.',
  'A valuable team player who contributes positively to the team.',
  'Shows potential but needs more focus on meeting project goals.',
  'Consistent in quality but needs to take more ownership of projects.',
  'Exceeds expectations and goes above and beyond the call of duty.',
  'Effective in handling complex tasks with minimal supervision.',
  'Good performance overall but should work on communication skills.',
];

export const employeeReviewFactory = async (prisma: PrismaClient): Promise<EmployeeReview> => {
  const employees = await prisma.employee.findMany({ select: { id: true } });

  if (employees.length === 0) {
    throw new Error('No employees found in the database.');
  }

  const randomEmployee = faker.helpers.arrayElement(employees);

  const comment =
    predefinedComments.length > 0
      ? predefinedComments[Math.floor(Math.random() * predefinedComments.length)]
      : faker.lorem.sentence();

  return {
    employeeId: randomEmployee.id,
    reviewerName: faker.person.fullName(),
    rating: Math.floor(Math.random() * 5) + 1,
    comments: comment,
    reviewDate: faker.date.past(),
  };
};
