import {Router as expressRouter} from 'express';
const router = expressRouter();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
