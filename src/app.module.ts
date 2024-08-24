import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { CustomersModule } from './models/customers/customers.module';
import { Customer } from './models/customers/entities/customer.entity';
import { User } from './models/users/entities/user.entity';
import { Role } from './models/roles/entities/role.entity';
import { RolesModule } from './models/roles/roles.module';
import { EmployeesModule } from './models/employees/employees.module';
import * as dotenv from 'dotenv';
import { Employee } from './models/employees/entities/employee.entity';
import { ProductsModule } from './models/products/products.module';
import { Product } from './models/products/entities/product.entity';
import { OrdersModule } from './models/orders/orders.module';
import { Order } from './models/orders/entities/order.entity';
import { OrderItemModule } from './models/order-item/order-item.module';
import { OrderItem } from './models/order-item/entities/order-item.entity';
import { EmployeeReviewModule } from './models/employee-review/employee-review.module';
import { EmployeeReview } from './models/employee-review/entities/employee-review.entity';

dotenv.config();

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    RolesModule,
    EmployeesModule,
    ProductsModule,
    OrdersModule,
    OrderItemModule,
    EmployeeReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
