const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid Email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cPassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})



userSchema.pre("save", async function(next){

    this.password = await bcrypt.hash(this.password, 12);
    this.cPassword = await bcrypt.hash(this.cPassword, 12);

    next();
})

const registerUsers = new mongoose.model("users", userSchema)

module.exports = registerUsers