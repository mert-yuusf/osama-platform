const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        company: {
            type: String,
            required: true,
        },

        from: {
            type: Date,
            required: true,
        },

        to: {
            type: Date,
            default: new Date().toISOString(),
        },

        current: {
            type: Boolean,
            default: false,
        },

        description: {
            type: String,
            default: null,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide userId'],
        },
    },
    { timestamps: true }
);

experienceSchema.set('toJSON', { virtuals: true });
experienceSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Experience', experienceSchema);
