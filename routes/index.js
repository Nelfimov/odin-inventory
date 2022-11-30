import {Router as expressRouter} from 'express';
import Item from '../models/item.js';

const router = expressRouter();

router.get('/', (req, res, next) => {
  const items = Item.find({}).
      populate('category').
      exec((err, listItems) => {
        if (err) {
          return next(err);
        };
        res.render('pages/index', {title: 'Home', items});
      });
});

export default router;
