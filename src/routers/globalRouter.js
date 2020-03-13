import express from 'express';

const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
  res.render('home');
});

export default globalRouter;
