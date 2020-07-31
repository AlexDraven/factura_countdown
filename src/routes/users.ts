import express from 'express';
// Controllers (route handlers)
import * as userController from '../controllers/user';

const Routes = express.Router();

// // Login
// Routes.post('/login', userController.loginWithPasswordAndUsername);

// Show All user
Routes.get('/', userController.users);

// Register
Routes.post('/register', userController.userCreate);

// Edit user
Routes.post('/:id', userController.editUserById);

// Show User
Routes.get('/:id', userController.getUserById);

// Delete User
Routes.delete('/:id', userController.deleteUser);

// Get next birthday in  other route comming
// Routes.get('/getProximaFecha');

module.exports = Routes;
