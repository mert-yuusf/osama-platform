const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middlewares/async-wrapper');

// const multer = require("multer");


const utilsController = {
    uploadMedia: asyncWrapper(async (req, res) => {
        console.log(req.file);
        res.json({ state: "Upload Media" })
    })
}

module.exports = utilsController
