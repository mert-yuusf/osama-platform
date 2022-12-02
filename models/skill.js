const mongoose = require('mongoose');
const Enum = require("../enums");
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

        level: {
            type: String,
            required: [true, 'Please provide percent value'],
            enum: {
                values: [
                    Enum.SkillLevel.Beginner,
                    Enum.SkillLevel.Intermediate,
                    Enum.SkillLevel.Expert,
                ],
                message: "{VALUE} dose not supported as skill"
            }
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
