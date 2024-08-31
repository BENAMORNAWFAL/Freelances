// routes/userRoutes.js

import express from 'express';
import {
    createUser, getUsers, getUserById,
    updateUser,
    deleteUser,
    loginUser,
} from '../controllers/userController.js';

const userRoutes = express.Router();


userRoutes.get('/api/users', getUsers);
userRoutes.post('/api/newuser', createUser);
userRoutes.get('/api/user/:id', getUserById);
userRoutes.put('/api/updateuser/:id', updateUser);
userRoutes.delete('/api/deleteuser/:id', deleteUser);
userRoutes.post('/api/login', loginUser);

export default userRoutes;
