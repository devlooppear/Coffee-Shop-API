import { faker } from '@faker-js/faker';

export interface CreateEmployee {
  name: string;
  email: string;
  phoneNumber: string;
  position: string;
  password: string;
}

export const employeeFactory = (): CreateEmployee => ({
  name: faker.person.fullName().slice(0, 100),
  email: faker.internet.email().slice(0, 100),
  phoneNumber: faker.phone.number().slice(0, 15),
  position: faker.person.jobTitle().slice(0, 50),
  password: faker.internet.password(),
});
