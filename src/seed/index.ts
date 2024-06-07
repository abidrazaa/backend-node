import logger from '@utils/logger';
import { seedCategories } from './category/category';
import { seedProducts } from './product/product';

export default async () => {
  logger.info('🌱  Seeding database...');
  try {
    await seedCategories();
    await seedProducts();
  } catch (error) {
    logger.info('❌  Error seeding database!');
  }
};
