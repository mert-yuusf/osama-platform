const express = require('express');
const utilsController = require('../controllers/utilsController');
const authenticateUser = require('../middlewares/authenticate-user');
const { uploadSinglePhoto, uploadMultiPhoto, resizeImages } = require("../middlewares/storage");
// import upload from '../middlewares/upload-media';

const userRoutes = express.Router();

userRoutes.use(authenticateUser);

userRoutes.post('/utils/upload/single', uploadSinglePhoto, resizeImages, utilsController.uploadMedia);

userRoutes.post('/utils/upload/multi', uploadMultiPhoto, resizeImages, utilsController.uploadMedia);

module.exports = userRoutes;
