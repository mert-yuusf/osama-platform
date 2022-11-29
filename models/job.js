const mongoose = require("mongoose");
const Enum = require("../enums");
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title of job"],
        trim: true,
    },

    jobType: {
        type: String,
        enum: {
            values: [
                Enum.JobTypes.FullTime,
                Enum.JobTypes.PartTime,
                Enum.JobTypes.ProjectBased,
                Enum.JobTypes.HourPrice,
                Enum.JobTypes.Remote,
            ],
            message: "{VALUE} is not supported value"
        }
    },

    workType: {
        type: String,
        enum: {
            values: [...Enum.WorkTypes],
            message: "{VALUE} is not supported value"
        }
    },

    description: {
        type: String,
        required: [true, "Please provide description of your work"],
        trim: true
    },

    responsibilities: [
        {
            type: {
                type: String,
                default: "Responsibility",
                enum: ["Responsibility"]
            },
            content: String,
        }
    ],

    active: {
        type: Boolean,
        default: true
    },

    address: {
        type: {
            type: String,
            default: 'Address',
            enum: ['Address'],
        },
        country: String,
        state: String,
        city: String,
        zipCode: String,
    },

    salary: {

        type: {
            type: String,
            enum: ["Salary"],
            default: "Salary"
        },
        amount: {
            type: Number,
            min: 0,
            required: [true, "Please provide amount value of this job"]
        },
        unit: {
            type: String,
            enum: {
                values: ["month", "hour"]
            }
        },
        required: [true, "Please provide "]
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide userId'],
    },
},
    {
        timestamps: true
    }
);


jobSchema.set('toJSON', { virtuals: true });
jobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Job", jobSchema);