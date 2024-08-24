import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const productsSeed = [
  'Espresso', 'Americano', 'Latte', 'Cappuccino', 'Macchiato', 'Mocha', 'Flat White', 'Cold Brew', 'Nitro Coffee', 'Affogato', 'Doppio', 'Ristretto', 'Café au Lait', 'Irish Coffee', 'Caramel Macchiato', 'Vanilla Latte', 'Hazelnut Coffee', 'Almond Coffee', 'Pumpkin Spice Latte', 'Peppermint Mocha', 'Café Mocha', 'Café Cortado', 'Turkish Coffee', 'Greek Coffee', 'Vietnamese Coffee', 'Latte Macchiato', 'Café Breve', 'Café con Leche', 'Café Cubano', 'Café Bombón', 'Affogato al Caffè', 'Espresso Martini', 'Coffee Milk', 'Café au Lait Macchiato', 'Honey Almond Latte', 'Raspberry Mocha', 'Salted Caramel Coffee', 'Maple Pecan Coffee', 'Gingerbread Latte', 'Toffee Nut Latte', 'White Chocolate Mocha', 'Chai Latte', 'Matcha Latte', 'Hot Chocolate', 'Mocha Frappuccino', 'Coffee Smoothie', 'Iced Americano', 'Iced Latte', 'Iced Cappuccino', 'Iced Mocha', 'Iced Caramel Latte', 'Iced Vanilla Latte', 'Iced Chai Latte', 'Iced Matcha Latte', 'Iced Coffee', 'Nitro Cold Brew', 'Nitro Vanilla Coffee', 'Cold Brew Float', 'Café con Miel', 'Maple Syrup Latte', 'Lavender Latte', 'Rose Latte', 'Turmeric Latte', 'Sweet Cream Cold Brew', 'Coconut Milk Latte', 'Oat Milk Latte', 'Almond Milk Latte', 'Soy Milk Latte', 'Lavender Honey Latte', 'Peach Iced Tea', 'Green Tea Latte', 'London Fog', 'Earl Grey Latte', 'Sweet Matcha Latte', 'Spiced Coffee', 'Cinnamon Roll Latte', 'Nutella Latte', 'Gingerbread Coffee', 'Caramel Pecan Latte', 'Chocolatier’s Delight', 'Bourbon Coffee', 'Coconut Mocha', 'Tiramisu Coffee', 'Black Forest Latte', 'Strawberry Latte', 'Blueberry Muffin Latte', 'Apple Cinnamon Latte', 'Pistachio Latte', 'Raspberry Almond Latte', 'Maple Bacon Latte', 'Coconut Almond Coffee', 'Fig and Walnut Latte', 'S’mores Latte', 'Croissant', 'Pain au Chocolat', 'Almond Croissant', 'Chocolate Danish', 'Cinnamon Roll', 'Blueberry Muffin', 'Banana Bread', 'Lemon Drizzle Cake', 'Carrot Cake', 'Cheesecake', 'Tiramisu', 'Apple Pie', 'Berry Tart', 'Lemon Bar', 'Brownie', 'Macaron', 'Madeleine', 'Scone', 'Pecan Pie', 'Raisin Scone', 'Coconut Macaroon', 'Eclair', 'Cupcake', 'Whoopie Pie', 'Raspberry Cheesecake', 'Pumpkin Pie', 'Gingerbread Cookies', 'Oatmeal Cookie', 'Snickerdoodle', 'Chocolate Chip Cookie', 'Peanut Butter Cookie', 'Molasses Cookie', 'Fruit Tart', 'Almond Cake', 'Angel Food Cake', 'Pound Cake', 'Victoria Sponge', 'Churros', 'Doughnut', 'Glazed Doughnut', 'Jelly Doughnut', 'Maple Doughnut', 'Powdered Sugar Doughnut', 'Raspberry Danish', 'Strawberry Shortcake', 'Coconut Cream Pie', 'Cherry Pie', 'Chocolate Éclair', 'Raspberry Macaron', 'Lemon Meringue Pie', 'Strawberry Cheesecake', 'Chocolate Tart', 'Pistachio Cake', 'Apricot Danish', 'Pumpkin Spice Muffin', 'Maple Bacon Scone', 'Peach Cobbler', 'Almond Biscotti', 'Spiced Apple Cake', 'Coconut Cupcake', 'Peach Tart', 'Sweet Potato Pie', 'Lavender Shortbread', 'Espresso Brownies', 'Chocolate Lava Cake', 'Peach Melba', 'Ginger Snap Cookies', 'Blueberry Scones', 'Chocolate Chip Muffin', 'Brioche', 'Babka', 'Cannoli', 'Ricotta Cheesecake', 'Butter Cake', 'Nutella Cupcake', 'Cherry Almond Scone', 'Lemon Poppy Seed Muffin', 'Apple Cinnamon Muffin', 'Brown Butter Cookies', 'Maple Cream Puff', 'Raspberry Almond Cake', 'Vanilla Bean Cupcake', 'Apricot Almond Cake', 'Pumpkin Chocolate Chip Muffin', 'Almond Poppy Seed Muffin', 'Caramel Apple Cake', 'White Chocolate Raspberry Muffin', 'Peanut Butter Brownies', 'Double Chocolate Muffin', 'Gingerbread Cake', 'Chocolate Peanut Butter Cupcake', 'Coconut Pecan Cake', 'Raspberry Lemon Bar', 'Peach Almond Cake', 'Carrot Cake Muffin', 'Lemon Blueberry Muffin', 'Pecan Sticky Buns', 'Maple Walnut Cake', 'S’mores Brownies', 'Red Velvet Cupcake', 'Coconut Macaron', 'Lemon Coconut Cake',
];

const prisma = new PrismaClient();

function getUniqueName(usedNames: Set<string>): string {
  if (usedNames.size < productsSeed.length) {
    let name: string;
    do {
      name = faker.helpers.arrayElement(productsSeed);
    } while (usedNames.has(name));
    usedNames.add(name);
    return name;
  }

  return faker.commerce.productName().slice(0, 100);
}

export interface Product {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
}

async function getCategoryIds(prisma: PrismaClient): Promise<number[]> {
  const categories = await prisma.category.findMany({
    select: { id: true },
  });
  return categories.map((category) => category.id);
}

export async function productFactory(prisma: PrismaClient): Promise<Product> {
  const categoryIds = await getCategoryIds(prisma);

  if (categoryIds.length === 0) {
    throw new Error('No categories found in the database.');
  }

  const usedNames = new Set<string>();
  
  return {
    name: getUniqueName(usedNames),
    description: faker.lorem.sentence().slice(0, 500),
    price: parseFloat(faker.commerce.price({ min: 1, max: 100, dec: 2 })),
    stock: Math.floor(Math.random() * 100) + 1,
    categoryId: faker.helpers.arrayElement(categoryIds),
  };
}
