import {Router as expressRouter} from 'express';
const router = expressRouter();

router.get('/', (req, res, next) => {
  res.render('pages/index', {title: 'Home'});
});

export default router;
