const express = require('express');
const jobController = require('../controllers/jobsController');
const authenticateUser = require('../middlewares/authenticate-user');
const authorizePermissions = require("../middlewares/authorizer-permission");

const jobsRoutes = express.Router();

jobsRoutes.use(authenticateUser);

jobsRoutes.route("/jobs")
    .get(jobController.getAll)
    .post(jobController.createJob)

module.exports = jobsRoutes;
