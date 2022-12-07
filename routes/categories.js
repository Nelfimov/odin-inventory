import {Router as expressRouter} from 'express';
import async from 'async';
import Category from '../models/category.js';
import Item from '../models/item.js';

const router = expressRouter();

router.get('/:name', (req, res, next) => {
  const string = req.params.name;
  const capitalized = string.charAt(0).toUpperCase + string.slice(1);

  async.parallel(
      {
        category(callback) {
          Category.findOne({name: capitalized}, '_id').exec(callback);
        },
        items(callback) {
          Item.find({'category.name': capitalized})
              .populate('category')
              .exec(callback);
        },
      },
      (err, result) => {
        if (err) return next(err);

        const {category, items} = result;

        if (category == null) {
          const error = new Error('Category not found');
          error.status = 404;
          return next(error);
        }

        res.render('pages/category', {
          title: category.name,
          category: category.name,
          items,
        });
      },
  );
});

export default router;
