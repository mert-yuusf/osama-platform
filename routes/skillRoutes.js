const express = require("express");
const skillController = require("../controllers/skillsController");
const authenticateUser = require("../middlewares/authenticate-user");

const skillRoutes = express.Router();

skillRoutes.get("/skills", [authenticateUser], skillController.getMySkills);
skillRoutes.post("/skills", [authenticateUser], skillController.createOne);
skillRoutes.get("/skills/:skillId", [authenticateUser], skillController.getOne);
skillRoutes.put(
  "/skills/:skillId",
  [authenticateUser],
  skillController.updateSkill
);
skillRoutes.delete(
  "/skills/:skillId",
  [authenticateUser],
  skillController.deleteSkill
);

module.exports = skillRoutes;
