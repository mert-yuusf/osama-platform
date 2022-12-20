const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middlewares/async-wrapper');

const usersController = {
    getProfile: asyncWrapper(async (req, res) => {
        const user = await User.findById(req.currentUserId)
            .select('-password')
            .populate({
                path: 'skills',
                select: '_id title description percent',
            })
            .populate({
                path: 'experiences',
                select: '_id title company from to current description',
            });
        res.status(StatusCodes.OK).json({
            result: user,
            message: 'account has loaded successfully',
        });
    }),

    updateProfile: asyncWrapper(async (req, res) => {
        const profile = await User.findByIdAndUpdate(
            { _id: req.currentUserId },
            { ...req.body },
            { new: true }
        );

        res.status(StatusCodes.OK).json({
            result: profile,
            status: 'success',
            message: 'account has loaded successfully',
        });
    }),

    uploadPhoto: asyncWrapper(async (req, res) => {
        const profile = await User.findByIdAndUpdate(
            { _id: req.currentUserId },
            { avatar: `${req.protocol}://${req.get('host')}/${req.media[0].replace("public/", "")}` },
            { new: true }
        );
        res.status(StatusCodes.OK).json({
            result: profile,
            status: 'success',
            message: 'account has loaded successfully',
        });
    })
};

module.exports = usersController;
