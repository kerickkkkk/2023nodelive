import userController from '../controller/userController'
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', userController.index);

export default router;
