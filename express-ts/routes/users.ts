import { Request, Response, NextFunction } from 'express';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction): void =>  {
  res.send('resdsouddde');
});

module.exports = router;