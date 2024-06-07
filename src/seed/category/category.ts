import CategoryModel from '@models/category';
import logger from '@utils/logger';

import categories from './categories.json';

export const seedCategories = async () => {
  if (await isCategoriesSeeded()) {
    logger.info('✅  Category seeding done!');
  } else {
    try {
      const models = categories.map((c) => new CategoryModel(c));
      const promises = models.map((l) => l.save());

      await Promise.allSettled(promises);

      logger.info('✅  Category seeding success!');
    } catch (error) {
      logger.info('❌  Category seeding failure!');
    }
  }
};

const isCategoriesSeeded = async () => {
  try {
    const item = categories[categories.length - 1];
    const category = await CategoryModel.findOne({ title: item.title });
    if (category) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
