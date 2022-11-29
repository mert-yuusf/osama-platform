const asyncWrapper = require("../middlewares/async-wrapper");

const jobController = {
    getAll: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "all viable jobs",
            message: "all jobs has loaded successfully",
        });
    }),

    createJob: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "create new job",
            message: "job has created successfully",
        });
    }),

    deleteJob: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "delete one job",
            message: "job has deleted successfully",
        });
    }),

    updateJob: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "update one job",
            message: "job has updated successfully",
        });
    }),

    applyJob: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "apply one job",
            message: "job has applied successfully",
        });
    }),

    saveJob: asyncWrapper(async (req, res) => {
        res.status(StatusCodes.OK).json({
            result: "save one job",
            message: "job has saved successfully",
        });
    }),
}


module.exports = jobController;