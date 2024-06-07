import CategoryModel from '@models/category';
import ProductModel from '@models/product';
import logger from '@utils/logger';

import products from './products.json';

type ProductType = (typeof products)[0];

export const seedProducts = async () => {
  if (await isProductsSeeded()) {
    logger.info('✅  Product seeding done!');
  } else {
    try {
      const parsedProducts = await Promise.all(products.map((c) => createProductModels(c)));

      const models = parsedProducts.map((c) => new ProductModel(c));
      const promises = models.map((l) => l.save());

      await Promise.allSettled(promises);

      logger.info('✅  Product seeding success!');
    } catch (error) {
      logger.info('❌  Product seeding failure!');
    }
  }
};

const createProductModels = async (product: ProductType) => {
  try {
    const category = await CategoryModel.findOne({ title: product.category });
    if (category) {
      return { ...product, category: category._id };
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

const isProductsSeeded = async () => {
  try {
    const item = products[products.length - 1];
    const product = await ProductModel.findOne({ title: item.title });
    if (product) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
