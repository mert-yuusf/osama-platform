const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticate-user');
const { uploadSinglePhoto, uploadMultiPhoto, resizeImages } = require("../middlewares/storage");

const userRoutes = express.Router();

userRoutes.use(authenticateUser);

userRoutes.get('/users/profile', userController.getProfile);
userRoutes.put('/users/profile', userController.updateProfile);
userRoutes.post("/users/upload-photo", uploadSinglePhoto, resizeImages, userController.uploadPhoto)
module.exports = userRoutes;
