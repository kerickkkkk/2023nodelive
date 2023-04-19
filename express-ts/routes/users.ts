import usersController from '../controller/usersController'
import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', usersController.getUsers);
router.post('/sign_up', usersController.signUp);


export default router;
