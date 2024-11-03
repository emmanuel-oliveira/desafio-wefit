import express from 'express';

import { createUser, listUsers } from "../controller/userController";

const router = express.Router();

router.post('/user', createUser);
router.get('/users', listUsers);

export default router;
