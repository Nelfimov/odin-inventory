import {Router as expressRouter} from 'express';
import Category from '../models/category.js';
import Item from '../models/item.js';

const router = expressRouter();

router
    .get('/new', (req, res, next) => {
      Category.find({})
          .lean()
          .then((categories) => {
            res.render('pages/form', {
              title: 'Add new item',
              header: 'Add new item',
              categories,
            });
          })
          .catch((err) => next(err));
    })
    .post('/new', (req, res, next) => {
      const {name, description, category, price, stock} = req.body;
      const newItem = new Item({
        name,
        description,
        category,
        price,
        number_in_stock: stock,
      });
      newItem.save((err) => {
        if (err) return next(err);

        console.log(newItem);
        res.redirect('/');
      });
    });

export default router;
