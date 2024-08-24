import { PrismaClient } from '@prisma/client';
import { employeeReviewFactory } from '../factories/employee-review.factory';

export async function seedEmployeeReviews(
  prisma: PrismaClient) {
  try {
    const numberOfReviews = 25;
    const reviews = await Promise.all(
      Array.from({ length: numberOfReviews }, () =>
        employeeReviewFactory(prisma),
      ),
    );

    await prisma.employeeReview.createMany({
      data: reviews,
    });

    console.log('Employee reviews seeded successfully');
  } catch (error) {
    console.error('Error seeding employee reviews:', error);
  }
}
