const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide skill title'],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            default: null,
        },

        percent: {
            type: Number,
            min: [0, 'min value of percent is 0'],
            max: [100, 'min value of percent is 100'],
            required: [true, 'Please provide percent value'],
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide userId'],
        },
    },
    { timestamps: true }
);

skillSchema.set('toJSON', { virtuals: true });
skillSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Skill', skillSchema);
