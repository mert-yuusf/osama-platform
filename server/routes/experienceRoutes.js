const express = require("express");
const experienceController = require("../controllers/experienceController");
const authenticateUser = require("../middlewares/authenticate-user");

const experienceRoutes = express.Router();

experienceRoutes.get(
  "/experiences",
  [authenticateUser],
  experienceController.getMyExperiences
);
experienceRoutes.post(
  "/experiences",
  [authenticateUser],
  experienceController.createOne
);
experienceRoutes.get(
  "/experiences/:experienceId",
  [authenticateUser],
  experienceController.getOne
);
experienceRoutes.put(
  "/experiences/:experienceId",
  [authenticateUser],
  experienceController.updateExperience
);
experienceRoutes.delete(
  "/experiences/:experienceId",
  [authenticateUser],
  experienceController.deleteExperience
);

module.exports = experienceRoutes;
