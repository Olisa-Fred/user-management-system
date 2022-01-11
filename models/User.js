const {Schema, model} = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "USER",
        uppercase: true,
        enum:["USER", "ADMIN", "SUPER-ADMIN", "DEVELOPER"]
    },
    accessToken: {
        type: String
    },
},{
    timestamps: true,
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

module.exports = model('User', userSchema);