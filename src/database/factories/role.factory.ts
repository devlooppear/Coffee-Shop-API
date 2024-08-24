import { faker } from '@faker-js/faker';

export interface Role {
  name: string;
  description?: string;
}

export const roleFactory = async (index: number): Promise<Role> => {
  const predefinedRoles = [
    {
      name: 'Admin',
      description: 'Has access to all system functionalities.',
    },
    {
      name: 'Product Manager',
      description: 'Manages product development and strategy.',
    },
    {
      name: 'Owner',
      description: 'Oversees overall company operations.',
    },
  ];

  const roleToCreate =
    index < predefinedRoles.length
      ? predefinedRoles[index]
      : {
          name: faker.person.jobTitle(),
          description: faker.lorem.sentence(),
        };

  return roleToCreate;
};
