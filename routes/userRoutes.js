const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticate-user');

const userRoutes = express.Router();

userRoutes.use(authenticateUser);

userRoutes.get('/users/profile', userController.getProfile);
userRoutes.put('/users/profile', userController.updateProfile);

module.exports = userRoutes;
