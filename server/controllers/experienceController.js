const { Experience } = require("../models");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const BaseError = require("../errors");

const experiencesController = {
    getMyExperiences: asyncWrapper(async (req, res) => {
        const experiences = await Experience.find({});
        res.status(StatusCodes.OK).json({
            result: experiences,
            status: "success",
            message: "experiences has loaded successfully",
        });
    }),

    getOne: asyncWrapper(async (req, res) => {
        const { experienceId } = req.params;
        const experience = await Experience.findById(experienceId);
        res.status(StatusCodes.OK).json({
            result: experience,
            status: "success",
            message: "experience has loaded successfully",
        });
    }),
    updateExperience: asyncWrapper(async (req, res) => {
        const { experienceId } = req.params;
        const experience = await Experience.findByIdAndUpdate(
            { _id: experienceId },
            { ...req.body },
            { new: true }
        );
        res.status(StatusCodes.OK).json({
            result: experience,
            status: "success",
            message: "experience has updated successfully",
        });
    }),

    deleteExperience: asyncWrapper(async (req, res) => {
        const { experienceId } = req.params;
        const experience = await Experience.findByIdAndDelete({
            _id: experienceId,
        });
        res.status(StatusCodes.OK).json({
            result: experience,
            status: "success",
            message: "Experience has deleted successfully",
        });
    }),
    createOne: asyncWrapper(async (req, res) => {
        const experience = await Experience.create({
            ...req.body,
            userId: req.currentUserId,
        });
        res.status(StatusCodes.OK).json({
            result: experience,
            status: "success",
            message: "Experience has created successfully",
        });
    }),
};

module.exports = experiencesController;
