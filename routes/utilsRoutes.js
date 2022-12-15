const express = require('express');
const utilsController = require('../controllers/utilsController');
const authenticateUser = require('../middlewares/authenticate-user');
const { uploadSingle } = require("../middlewares/upload-media");
// import upload from '../middlewares/upload-media';

const userRoutes = express.Router();

userRoutes.use(authenticateUser);

userRoutes.post('/utils/upload', uploadSingle, utilsController.uploadMedia);

module.exports = userRoutes;
