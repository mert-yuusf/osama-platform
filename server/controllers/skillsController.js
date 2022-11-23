const { Skill } = require("../models");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const BaseError = require("../errors");

const skillsController = {
  getMySkills: asyncWrapper(async (req, res) => {
    const skills = await Skill.find({});
    res.status(StatusCodes.OK).json({
      result: skills,
      status: "success",
      message: "skills has loaded successfully",
    });
  }),

  getOne: asyncWrapper(async (req, res) => {
    const { skillId } = req.params;
    const skill = await Skill.findById(skillId);
    res.status(StatusCodes.OK).json({
      result: skill,
      status: "success",
      message: "skill has loaded successfully",
    });
  }),
  updateSkill: asyncWrapper(async (req, res) => {
    const { skillId } = req.params;
    const skill = await Skill.findByIdAndUpdate(
      { _id: skillId },
      { ...req.body },
      { new: true }
    );
    res.status(StatusCodes.OK).json({
      result: skill,
      status: "success",
      message: "skill has updated successfully",
    });
  }),

  deleteSkill: asyncWrapper(async (req, res) => {
    const { skillId } = req.params;
    const skill = await Skill.findByIdAndDelete({ _id: skillId });
    res.status(StatusCodes.OK).json({
      result: skill,
      status: "success",
      message: "skill has deleted successfully",
    });
  }),
  createOne: asyncWrapper(async (req, res) => {
    const skill = await Skill.create({
      ...req.body,
      userId: req.currentUserId,
    });
    res.status(StatusCodes.OK).json({
      result: skill,
      status: "success",
      message: "skill has created successfully",
    });
  }),
};

module.exports = skillsController;
