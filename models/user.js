const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const Enum = require("../enums");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please provide fullName'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Please provide firstName'],
            trim: true,
            unique: [true, 'Please provide your email'],
            lowercase: true,
            validate: [validator.isEmail, 'Please provide valid email'],
        },

        avatar: {
            type: String,
            default: null
        },

        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: [4, 'password min length 4 char'],
            trim: true,
        },

        passwordResetExpire: {
            type: String,
            default: null,
        },

        bio: {
            type: String,
            default: null,
        },

        position: {
            type: String,
            default: null,
        },

        gender: {
            type: String,
            enum: {
                values: ["male", "female"]
            }
        },
        role: {
            type: String,
            enum: {
                values: [
                    Enum.UserRoles.Admin,
                    Enum.UserRoles.Company,
                    Enum.UserRoles.Freelancer
                ],
                message: '{VALUE} is not supported value',
            },
            default: Enum.UserRoles.Freelancer,
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

        social: {
            youtube: {
                type: String,
                default: null,
            },

            twitter: {
                type: String,
                default: null,
            },

            facebook: {
                type: String,
                default: null,
            },

            linkedin: {
                type: String,
                default: null,
            },

            instagram: {
                type: String,
            },

            personalSite: {
                type: String,
            },
        },

        languages: [
            {
                type: {
                    type: String,
                    enum: ['Language'],
                    default: 'Language',
                },
                name: String,
                level: {
                    type: String,
                    enum: {
                        values: ['native', 'intermediate', 'advanced'],
                        message: '{VALUE} dose not supported',
                    },
                },
            },
        ],
    },
    { timestamps: true }
);

// encrypt password before save it to database
userSchema.pre('save', async function (next) {
    // check if the provided password is valid like defined in schema
    if (!this.isModified('password')) return;
    // hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("avatar")) return;
    this.avatar = `https://ui-avatars.com/api/?name=${this.fullName}&background=random`
    next();
})

userSchema.methods.comparePassword = async function (providedPassword) {
    return await bcrypt.compare(providedPassword, this.password);
};

// generate rest token
userSchema.methods.generateRestToken = async function () {
    const restToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(restToken)
        .digest('hex');
    // add 10 minutes as expire time
    this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
    await this.save({ validateBeforeSave: false });
    return this.passwordResetToken;
};

userSchema.virtual('skills', {
    ref: 'Skill',
    localField: '_id',
    foreignField: 'user',
});

userSchema.virtual('experiences', {
    ref: 'Experience',
    localField: '_id',
    foreignField: 'user',
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
