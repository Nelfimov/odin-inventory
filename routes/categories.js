import {Router as expressRouter} from 'express';
import async from 'async';
import Category from '../models/category.js';
import Item from '../models/item.js';

const router = expressRouter();

router.get('/:name', (req, res, next) => {
  const string = req.params.name;
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1);

  async.parallel(
      {
        category(callback) {
          Category.findOne({name: capitalized}).exec(callback);
        },
        items(callback) {
          Item.find().populate('category').exec(callback);
        },
      },
      (err, result) => {
        if (err) return next(err);

        const {category, items} = result;

        const filteredItems = items.filter(
            (item) =>
              item.category.name === capitalized || item.category.name === string,
        );

        console.log(items);

        if (category == null) {
          const error = new Error('Category not found');
          error.status = 404;
          return next(error);
        }

        res.render('pages/index', {
          title: category.name,
          header: category.name,
          subheader: category.description,
          items: filteredItems,
        });
      },
  );
});

export default router;
