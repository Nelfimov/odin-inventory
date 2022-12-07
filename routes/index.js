import {Router as expressRouter} from 'express';
import Item from '../models/item.js';

const router = expressRouter();

router.get('/', (req, res, next) => {
  Item.find({}, 'name description category price number_in_stock')
  // .lean()
      .then((items) => {
        res.render('pages/index', {title: 'Home', items: items});
      })
      .catch((err) => next(err));
});

export default router;
