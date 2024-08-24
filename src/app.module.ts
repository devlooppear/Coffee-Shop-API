import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { CustomersModule } from './models/customers/customers.module';
import { RolesModule } from './models/roles/roles.module';
import { EmployeesModule } from './models/employees/employees.module';
import * as dotenv from 'dotenv';
import { ProductsModule } from './models/products/products.module';
import { OrdersModule } from './models/orders/orders.module';
import { OrderItemModule } from './models/order-item/order-item.module';
import { EmployeeReviewModule } from './models/employee-review/employee-review.module';
import { PermissionModule } from './models/permission/permission.module';

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
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
