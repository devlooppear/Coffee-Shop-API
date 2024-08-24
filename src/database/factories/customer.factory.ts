import { faker } from '@faker-js/faker';

export interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export const customerFactory = (): Customer => ({
  name: faker.person.fullName().slice(0, 100),
  email: faker.internet.email().slice(0, 100),
  phoneNumber: faker.phone.number().slice(0, 15),
  address: faker.location.streetAddress().slice(0, 500),
});
