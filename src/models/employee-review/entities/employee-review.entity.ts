import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employee_reviews')
export class EmployeeReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_id' })
  employeeId: number;

  @Column({ name: 'reviewer_name' })
  reviewerName: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comments?: string;

  @Column({ name: 'review_date' })
  reviewDate: Date;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
