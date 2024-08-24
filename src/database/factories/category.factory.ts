import { faker } from '@faker-js/faker';

const cafeCategories = [
  'Specialty Coffees',
  'Classic Coffees',
  'Teas',
  'Sweets and Desserts',
  'Snacks',
  'Iced Beverages',
  'Hot Beverages',
  'Iced Coffees',
  'Coffee with Milk',
  'Appetizers',
  'Savory Items',
  'Pancakes and Waffles',
  'Smoothies and Shakes',
  'Natural Juices',
  'Cookies and Biscuits',
  'Pies and Cakes',
  'Single-Origin Coffees',
  'Coffee Blends',
  'Breakfast Items',
  'Gourmet Sandwiches',
  'Seasonal Specials',
  'Pastries',
  'Frozen Desserts',
  'Healthy Options',
  'Vegetarian Options',
  'Gluten-Free Treats',
  'Regional Specialties',
  'Holiday-Themed Items',
  'Organic Coffees',
  'Vegan Treats',
];

export interface Category {
  name: string;
  description?: string;
}

export const categoryFactory = (): Category => {
  const name = faker.helpers.arrayElement(cafeCategories);
  return {
    name,
    description: faker.lorem.sentence(),
  };
};
